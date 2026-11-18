import os
import re
import json
import base64
from werkzeug.utils import secure_filename
from flask import Flask, request, jsonify, send_from_directory, render_template_string
import database

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOADS_DIR = os.path.join(BASE_DIR, 'uploads')
os.makedirs(UPLOADS_DIR, exist_ok=True)

# Initialize database
database.init_db()

app = Flask(__name__, static_folder='.', static_url_path='')
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024 # 50 MB max upload

def save_b64_file(b64_str, target_path):
    if ',' in b64_str:
        b64_str = b64_str.split(',', 1)[1]
    data = base64.b64decode(b64_str)
    with open(target_path, 'wb') as f:
        f.write(data)

# --- Routes ---

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/project/<slug>')
def view_project(slug):
    # Serves the exact same index.html, which will read the slug and display the project
    return send_from_directory('.', 'index.html')

@app.route('/uploads/<path:filename>')
def serve_upload(filename):
    return send_from_directory(UPLOADS_DIR, filename)

@app.route('/api/projects', methods=['GET'])
def list_projects():
    projects = database.get_all_projects_summary()
    return jsonify({'success': True, 'projects': projects})

@app.route('/api/projects/<slug>', methods=['GET'])
def get_project(slug):
    project = database.get_project_by_slug(slug)
    if not project:
        return jsonify({'success': False, 'error': 'Project not found'}), 404
    return jsonify({'success': True, 'project': project})

@app.route('/api/projects', methods=['POST'])
def create_project():
    try:
        # Check if multipart form data or JSON
        is_json = request.is_json
        payload = request.get_json(silent=True) if is_json else request.form

        custom_slug = payload.get('slug', '').strip() if payload else ''
        if not custom_slug:
            slug = database.get_next_project_slug()
        else:
            slug = re.sub(r'[^a-zA-Z0-9_\-]', '', custom_slug)

        project_upload_dir = os.path.join(UPLOADS_DIR, slug)
        os.makedirs(project_upload_dir, exist_ok=True)

        mode = payload.get('mode', 'love') if payload else 'love'
        person1_name = payload.get('person1_name', 'محمد') if payload else 'محمد'
        person2_name = payload.get('person2_name', 'نور') if payload else 'نور'
        anniversary_date = payload.get('anniversary_date', '') if payload else ''
        nickname = payload.get('nickname', '') if payload else ''
        letter = payload.get('letter', '') if payload else ''
        theme = payload.get('theme', 'theme-rose') if payload else 'theme-rose'
        music_type = payload.get('music_type', 'piano') if payload else 'piano'

        # Insert project into SQLite
        conn = database.get_db()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO projects (slug, mode, person1_name, person2_name, anniversary_date, nickname, letter, theme, music_type)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (slug, mode, person1_name, person2_name, anniversary_date, nickname, letter, theme, music_type))

        saved_photos = []

        if is_json and payload:
            # Base64 images or Direct Cloud URLs processing
            boy_photos = payload.get('boy_photos', [])
            for idx, img_b64 in enumerate(boy_photos):
                if img_b64.startswith('data:image'):
                    ext = 'png' if 'image/png' in img_b64 else 'jpg'
                    fname = f"boy_{idx+1}.{ext}"
                    fpath = os.path.join(project_upload_dir, fname)
                    save_b64_file(img_b64, fpath)
                    saved_photos.append(('boy', f"uploads/{slug}/{fname}", idx))
                elif img_b64.startswith('http') or img_b64.startswith('images/'):
                    saved_photos.append(('boy', img_b64, idx))

            girl_photos = payload.get('girl_photos', [])
            for idx, img_b64 in enumerate(girl_photos):
                if img_b64.startswith('data:image'):
                    ext = 'png' if 'image/png' in img_b64 else 'jpg'
                    fname = f"girl_{idx+1}.{ext}"
                    fpath = os.path.join(project_upload_dir, fname)
                    save_b64_file(img_b64, fpath)
                    saved_photos.append(('girl', f"uploads/{slug}/{fname}", idx))
                elif img_b64.startswith('http') or img_b64.startswith('images/'):
                    saved_photos.append(('girl', img_b64, idx))

            together_photos = payload.get('together_photos', [])
            for idx, img_b64 in enumerate(together_photos):
                if img_b64.startswith('data:image'):
                    ext = 'png' if 'image/png' in img_b64 else 'jpg'
                    fname = f"together_{idx+1}.{ext}"
                    fpath = os.path.join(project_upload_dir, fname)
                    save_b64_file(img_b64, fpath)
                    saved_photos.append(('together', f"uploads/{slug}/{fname}", idx))
                elif img_b64.startswith('http') or img_b64.startswith('images/'):
                    saved_photos.append(('together', img_b64, idx))

        else:
            # Multipart files upload
            boy_files = request.files.getlist('boy_photos')
            for idx, f in enumerate(boy_files):
                if f and f.filename:
                    fname = f"boy_{idx+1}_{secure_filename(f.filename)}"
                    f.save(os.path.join(project_upload_dir, fname))
                    saved_photos.append(('boy', f"uploads/{slug}/{fname}", idx))

            girl_files = request.files.getlist('girl_photos')
            for idx, f in enumerate(girl_files):
                if f and f.filename:
                    fname = f"girl_{idx+1}_{secure_filename(f.filename)}"
                    f.save(os.path.join(project_upload_dir, fname))
                    saved_photos.append(('girl', f"uploads/{slug}/{fname}", idx))

            together_files = request.files.getlist('together_photos')
            for idx, f in enumerate(together_files):
                if f and f.filename:
                    fname = f"together_{idx+1}_{secure_filename(f.filename)}"
                    f.save(os.path.join(project_upload_dir, fname))
                    saved_photos.append(('together', f"uploads/{slug}/{fname}", idx))

        # Insert photos into SQLite
        for cat, path, order in saved_photos:
            cursor.execute('''
                INSERT INTO project_photos (project_slug, category, file_path, sort_order)
                VALUES (?, ?, ?, ?)
            ''', (slug, cat, path, order))

        conn.commit()
        conn.close()

        host_url = request.host_url.rstrip('/')
        project_url = f"{host_url}/project/{slug}"
        relative_url = f"/project/{slug}"

        return jsonify({
            'success': True,
            'slug': slug,
            'url': relative_url,
            'share_url': project_url
        })

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"==================================================")
    print(f"💖 تطبيق الحب والصداقة (Flask + SQLite) يعمل الآن!")
    print(f"👉 افتح الرابط في المتصفح: http://localhost:{port}")
    print(f"==================================================")
    app.run(host='0.0.0.0', port=port, debug=True)
