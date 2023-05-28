import db

def get_high_scores_formated():
    res = []
    data = db.get_users_by_highscore()
    for user in data:
        res.append({'name': user['name'], 'score': user['score']})
    return res