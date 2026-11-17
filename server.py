import os
import re
import json
import base64
import subprocess
from http.server import SimpleHTTPRequestHandler, HTTPServer

PORT = 8000
IMAGES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images')

def get_next_project_id():
    os.makedirs(IMAGES_DIR, exist_ok=True)
    existing = os.listdir(IMAGES_DIR)
    max_num = 0
    for item in existing:
        match = re.match(r'^project_(\d+)$', item)
        if match:
            num = int(match.group(1))
            if num > max_num:
                max_num = num
    return f"project_{max_num + 1}"

def save_base64_image(base64_str, output_path):
    # Format: "data:image/jpeg;base64,..."
    if ',' in base64_str:
        base64_str = base64_str.split(',', 1)[1]
    data = base64.b64decode(base64_str)
    with open(output_path, 'wb') as f:
        f.write(data)

class LoveServerHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == '/api/projects':
            os.makedirs(IMAGES_DIR, exist_ok=True)
            projects = []
            for item in sorted(os.listdir(IMAGES_DIR)):
                proj_path = os.path.join(IMAGES_DIR, item)
                data_file = os.path.join(proj_path, 'data.json')
                if os.path.isdir(proj_path) and os.path.exists(data_file):
                    try:
                        with open(data_file, 'r', encoding='utf-8') as f:
                            p_data = json.load(f)
                            projects.append({
                                'id': item,
                                'p1': p_data.get('person1Name', ''),
                                'p2': p_data.get('person2Name', ''),
                                'mode': p_data.get('mode', 'love')
                            })
                    except Exception:
                        projects.append({'id': item})
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps(projects, ensure_ascii=False).encode('utf-8'))
            return

        super().do_GET()

    def do_POST(self):
        if self.path == '/api/save-project':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            try:
                payload = json.loads(body)
                project_id = payload.get('projectId', '').strip()
                if not project_id:
                    project_id = get_next_project_id()
                else:
                    # Sanitize folder name
                    project_id = re.sub(r'[^a-zA-Z0-9_\-]', '', project_id)

                project_dir = os.path.join(IMAGES_DIR, project_id)
                os.makedirs(project_dir, exist_ok=True)

                saved_boy_photos = []
                saved_girl_photos = []
                saved_together_photos = []

                # Save Boy Photos
                for i, img_data in enumerate(payload.get('boyPhotos', [])):
                    if img_data.startswith('data:image'):
                        ext = 'png' if 'image/png' in img_data else 'jpg'
                        filename = f"boy_{i+1}.{ext}"
                        save_base64_image(img_data, os.path.join(project_dir, filename))
                        saved_boy_photos.append(f"images/{project_id}/{filename}")
                    elif img_data.startswith('http') or img_data.startswith('images/'):
                        saved_boy_photos.append(img_data)

                # Save Girl Photos
                for i, img_data in enumerate(payload.get('girlPhotos', [])):
                    if img_data.startswith('data:image'):
                        ext = 'png' if 'image/png' in img_data else 'jpg'
                        filename = f"girl_{i+1}.{ext}"
                        save_base64_image(img_data, os.path.join(project_dir, filename))
                        saved_girl_photos.append(f"images/{project_id}/{filename}")
                    elif img_data.startswith('http') or img_data.startswith('images/'):
                        saved_girl_photos.append(img_data)

                # Save Together Photos
                for i, img_data in enumerate(payload.get('togetherPhotos', [])):
                    if img_data.startswith('data:image'):
                        ext = 'png' if 'image/png' in img_data else 'jpg'
                        filename = f"together_{i+1}.{ext}"
                        save_base64_image(img_data, os.path.join(project_dir, filename))
                        saved_together_photos.append(f"images/{project_id}/{filename}")
                    elif img_data.startswith('http') or img_data.startswith('images/'):
                        saved_together_photos.append(img_data)

                # Build data.json
                data_record = {
                    'projectId': project_id,
                    'mode': payload.get('mode', 'love'),
                    'person1Name': payload.get('person1Name', 'محمد'),
                    'person2Name': payload.get('person2Name', 'نور'),
                    'anniversaryDate': payload.get('anniversaryDate', ''),
                    'loveNickname': payload.get('loveNickname', ''),
                    'loveLetter': payload.get('loveLetter', ''),
                    'theme': payload.get('theme', 'theme-rose'),
                    'boyPhotos': saved_boy_photos,
                    'girlPhotos': saved_girl_photos,
                    'togetherPhotos': saved_together_photos
                }

                data_path = os.path.join(project_dir, 'data.json')
                with open(data_path, 'w', encoding='utf-8') as f:
                    json.dump(data_record, f, ensure_ascii=False, indent=2)

                # Try auto git commit and push if git is available
                git_status = "skipped"
                try:
                    subprocess.run(['git', 'add', 'images/'], check=True, capture_output=True)
                    subprocess.run(['git', 'commit', '-m', f"feat: add {project_id}"], check=True, capture_output=True)
                    subprocess.run(['git', 'push', 'origin', 'main'], check=True, capture_output=True)
                    git_status = "pushed"
                except Exception as ge:
                    git_status = f"local_saved ({str(ge)})"

                live_url = f"https://medo-adel.github.io/Love/?id={project_id}"
                local_url = f"http://localhost:{PORT}/?id={project_id}"

                resp = {
                    'success': True,
                    'projectId': project_id,
                    'liveUrl': live_url,
                    'localUrl': local_url,
                    'gitStatus': git_status
                }

                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps(resp, ensure_ascii=False).encode('utf-8'))

            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))
            return

        super().do_POST()

def run_server():
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, LoveServerHandler)
    print(f"==================================================")
    print(f"💖 سيرفر صانع حكايات الحب والصداقة يعمل الآن!")
    print(f"👉 افتح الرابط في المتصفح: http://localhost:{PORT}")
    print(f"==================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nتم إيقاف السيرفر.")
        httpd.server_close()

if __name__ == '__main__':
    run_server()
