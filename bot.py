import os
from aiogram.types import InlineQueryResultGame
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.dispatcher.filters.state import StatesGroup, State
from aiogram.dispatcher import FSMContext
from aiogram import Bot, Dispatcher, executor, types
import logging
import random
from uuid import uuid4
import keyboards as kb



logging.basicConfig(#filename="sample.log",
                    level=logging.INFO,
                    #filemode='w',
                    format='%(asctime)s - %(levelname)s - %(message)s',)

API_TOKEN = str(os.environ.get('BOT_TOKEN'))

url = str(os.environ.get('GAME_URL'))
game_short_name = 'high_tech_park'
storage = MemoryStorage()
bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot, storage=storage)


class State(StatesGroup):
    add_players = State()
    set_characters = State()
    playing = State()

# @dp.inline_handler()
# async def send_game(inline_query: types.InlineQuery):
#     await bot.answer_inline_query(inline_query.id,
#                                   [InlineQueryResultGame(id=str(uuid4()), 
#                                                          game_short_name=game_short_name)])

@dp.message_handler(commands=['start'], state="*")
async def send_welcome(message: types.Message, state: FSMContext):
    chat_id = message.from_user.id
    await bot.send_game(chat_id=chat_id, game_short_name='high_tech_park')


@dp.callback_query_handler()
async def send_welcome(callback_query: types.CallbackQuery):
    await bot.answer_callback_query(callback_query.id, url=url)

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)