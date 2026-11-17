import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database.db')

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Projects table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            mode TEXT NOT NULL DEFAULT 'love',
            person1_name TEXT NOT NULL,
            person2_name TEXT NOT NULL,
            anniversary_date TEXT,
            nickname TEXT,
            letter TEXT,
            theme TEXT DEFAULT 'theme-rose',
            music_type TEXT DEFAULT 'piano',
            custom_audio_path TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Project Photos table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS project_photos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_slug TEXT NOT NULL,
            category TEXT NOT NULL, -- 'boy', 'girl', 'together'
            file_path TEXT NOT NULL,
            sort_order INTEGER DEFAULT 0,
            FOREIGN KEY (project_slug) REFERENCES projects(slug) ON DELETE CASCADE
        )
    ''')

    conn.commit()
    conn.close()

def get_next_project_slug():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT slug FROM projects WHERE slug LIKE 'project_%'")
    rows = cursor.fetchall()
    conn.close()

    max_num = 0
    import re
    for row in rows:
        match = re.match(r'^project_(\d+)$', row['slug'])
        if match:
            num = int(match.group(1))
            if num > max_num:
                max_num = num
    return f"project_{max_num + 1}"

def get_project_by_slug(slug):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM projects WHERE slug = ?", (slug,))
    project = cursor.fetchone()
    if not project:
        conn.close()
        return None

    project_dict = dict(project)

    # Fetch photos
    cursor.execute(
        "SELECT category, file_path FROM project_photos WHERE project_slug = ? ORDER BY sort_order ASC",
        (slug,)
    )
    photos = cursor.fetchall()
    conn.close()

    boy_photos = []
    girl_photos = []
    together_photos = []

    for photo in photos:
        cat = photo['category']
        path = photo['file_path']
        if cat == 'boy':
            boy_photos.append(path)
        elif cat == 'girl':
            girl_photos.append(path)
        elif cat == 'together':
            together_photos.append(path)

    project_dict['boy_photos'] = boy_photos
    project_dict['girl_photos'] = girl_photos
    project_dict['together_photos'] = together_photos
    return project_dict

def get_all_projects_summary():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT slug, mode, person1_name, person2_name, created_at FROM projects ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]
