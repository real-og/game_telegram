from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import os
import logic
import db


app = Flask(__name__)
CORS(app)

ssl_cert_path = str(os.environ.get('ssl_cert_path'))
ssl_key_path = str(os.environ.get('ssl_key_path'))


@app.route('/')
def index():
    print(request.args)
    return render_template('index.html')

@app.route('/highscores', methods=['GET'])
def send_json():
    response = logic.get_high_scores_formated()
    return jsonify(response)

@app.route('/set_score', methods=['POST'])
def set_score():
    data = request.get_json()
    db.add_run(data.get('score'), data.get('name'), data.get('id_tg'))
    # logic.set_score()
    response = logic.get_high_scores_formated()
    return jsonify(response)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=443, ssl_context=(ssl_cert_path, ssl_key_path))
    # app.run(host='0.0.0.0')
