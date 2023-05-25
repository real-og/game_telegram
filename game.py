from flask import Flask, jsonify, render_template, request


app = Flask(__name__)

ssl_cert_path = '/etc/letsencrypt/live/facegame.tw1.ru/fullchain.pem'
ssl_key_path = '/etc/letsencrypt/live/facegame.tw1.ru/privkey.pem'


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/highscores', methods=['GET'])
def send_json():
    response = [
            { 'name': 'traher',
              'score' : 400,
            },
            { 'name': 'johnny',
              'score' : 364,
            },
            { 'name': 'billy',
              'score' : 51,
            },
        ]
    
    return jsonify(response)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=443, ssl_context=(ssl_cert_path, ssl_key_path))
    # app.run(host='0.0.0.0')
