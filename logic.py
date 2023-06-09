import db
from bot import API_TOKEN
import requests

def get_high_scores_formated():
    res = []
    data = db.get_users_by_highscore()
    for user in data:
        res.append({'name': user['name'], 'score': user['score']})
    return res

def set_score(user_id, chat_id, score, message_id):
    url = f"https://api.telegram.org/bot{API_TOKEN}/setGameScore"
    params = {
        'user_id': user_id,
        'chat_id': chat_id,
        'score': score,
        'message_id' : message_id
    }
    response = requests.post(url, params=params)
    return response.status_code