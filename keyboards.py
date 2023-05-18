from aiogram.types import ReplyKeyboardRemove, \
    ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton
from typing import List


game_button = InlineKeyboardButton(text='играть', callback_game='https://real-og.github.io/site%201/')
game_kb = InlineKeyboardMarkup()
game_kb.add(game_button)