from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start_game', methods=['GET', 'POST'])
def start_game():
    if request.method == 'POST':
        # Логика начала игры
        success = True
        message = 'Игра началась!'
        error = None

        # Возвращаем ответ в формате JSON
        response = {'success': success, 'message': message, 'error': error}
        return jsonify(data=response, ensure_ascii=False)

if __name__ == '__main__':
    app.run(host='0.0.0.0')