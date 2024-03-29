import os
from aiogram.types import InlineQueryResultGame
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.contrib.fsm_storage.redis import RedisStorage2
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

# url = str(os.environ.get('GAME_URL'))
url = 'https://facegame.tw1.ru'
game_short_name = 'high_tech_park'


# storage = RedisStorage2(db=10)
storage = MemoryStorage()


bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot, storage=storage)


class State(StatesGroup):
    add_players = State()
    set_characters = State()
    playing = State()

                                                   
@dp.message_handler(commands=['start'], state="*")
async def send_welcome(message: types.Message, state: FSMContext):
    chat_id = message.from_user.id
    data = await state.get_data()
    if data.get('highscore') is None:
        await state.update_data(highscore=0)
    message = await bot.send_game(chat_id=chat_id, game_short_name='high_tech_park')


@dp.message_handler(commands=['set'], state="*")
async def send_welcome(message: types.Message, state: FSMContext):
    chat_id = message.from_user.id






@dp.callback_query_handler()
async def send_welcome(callback_query: types.CallbackQuery):
    await bot.answer_callback_query(callback_query.id, url=url)

if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)