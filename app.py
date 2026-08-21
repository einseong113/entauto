import os
from flask import Flask, send_from_directory, abort

app = Flask(__name__, static_folder='.', static_url_path='')

# 1. 메인 페이지 (/) -> main.html
@app.route('/')
def home():
    if os.path.exists('main.html'):
        return send_from_directory('.', 'main.html')
    return "main.html을 찾을 수 없습니다.", 404

# 2. games 폴더 안의 모든 html 파일 처리 (/games/2048, /games/snake.html 등)
@app.route('/games/<path:page_name>')
def game_page(page_name):
    if not page_name.endswith('.html'):
        page_name += '.html'
    
    file_path = os.path.join('games', page_name)
    if os.path.exists(file_path):
        return send_from_directory('games', page_name)
    
    abort(404)

# 3. style.css 등 최상위 파일 자동 제공
@app.route('/<path:filename>')
def serve_static(filename):
    if os.path.exists(filename):
        return send_from_directory('.', filename)
    abort(404)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
