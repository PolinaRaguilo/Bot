const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const express = require("express");
const app = express();

const pg = require("pg")
const client = new pg.Client(config.DB_URL);

client.connect()
      .then(()=>console.log('PostgreSQL connected'))
      .catch((err) => console.log(err))


const bot = new TelegramBot(config.TOKEN, { polling: true });

const startKeyboard={
  reply_markup:({
    keyboard: [
      ['Записаться на услугу','Отменить запись'],
      ['Изменить дату и время записи'],
      ['Изменить услугу'],
      [ 'Выход']
    ]
  })
  }

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Привет, ${msg.from.first_name}.Чем я могу тебе помочь?`, startKeyboard);
});




let masterKeyboard={
  reply_markup:JSON.stringify({
    keyboard: [
      ['Игорь Иванов','Егор Козлов'],
      ['Сергей Короткий','Екатерина Антипенко'],
      [ 'Назад']
    ]
  })
}



bot.onText(/Записаться на услугу/,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай выберем услугу `, masterKeyboard );
  
})



bot.onText(/Игорь Иванов/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай посмотрим его свободные места `, masterKeyboard );
})

bot.onText(/Егор Козлов/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай посмотрим его свободные места `, masterKeyboard );
  
})

bot.onText(/Сергей Короткий/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай посмотрим его свободные места `, masterKeyboard );
  
})

bot.onText(/Екатерина Антипенко/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай посмотрим его свободные места `, masterKeyboard );
  
})

bot.onText(/Назад/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `что тебя интересует?`, startKeyboard );
  
})