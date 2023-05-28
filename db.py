import psycopg2
import psycopg2.extras
from typing import List, Literal
import os
import json 
import datetime

class Database(object):
    def __init__(self):
        self.conn = psycopg2.connect(
            database=str(os.environ.get('database')),
            user=str(os.environ.get('user')),
            password=str(os.environ.get('password')),
            host=str(os.environ.get('host')),
            port=str(os.environ.get('port'))
        )
        self.curs = self.conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    def __enter__(self):
        return self.curs

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.commit()
        self.conn.close()

def get_users_by_highscore():
    with Database() as curs:
        _SQL = f'SELECT name, score FROM users order by score desc limit 5;'
        curs.execute(_SQL)
        return curs.fetchall()
    
def add_run(score, name='unknown', id_tg='null'):
    with Database() as curs:
        if score is None:
            score = 'null'
        if name is None:
            name = 'null'
        if id_tg is None:
            id_tg = 'null'
        _SQL = f"insert into users (id_tg, name, score) values ({id_tg}, '{name}', {score});"
        curs.execute(_SQL)
        