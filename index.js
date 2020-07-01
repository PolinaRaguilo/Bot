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

const uslugiKeyboard={
  reply_markup:({
    keyboard: [
      ['Мужская стрижка','Стрижка бороды и усов','Стрижка машинкой'],
      ['Классическое бритье','Детская стрижка','Королевское бритье'],
      ['Отец + сын','Друг + друг','Стрижка + бритье'],
      ['Главное меню']
    ]
  })
  }

let masterKeyboard={
  reply_markup:JSON.stringify({
    keyboard: [
      ['Игорь Иванов','Егор Козлов'],
      ['Сергей Короткий','Екатерина Антипенко'],
      [ 'Вернуться к выбору услуги']
    ],
    resize_keyboard:true
  })
}

let DaNetKeyboard={
  reply_markup:JSON.stringify({
    keyboard: [
      ['Да,хочу записаться','Нет,хочу другую услугу']
    ],
    resize_keyboard:true
  })
}

let NextKeyboard={
  reply_markup:JSON.stringify({
    keyboard: [
      ['Далее'],
      ['Вернуться к выбору мастера']
    ],
    resize_keyboard:true,
  })
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Привет, ${msg.from.first_name}.Чем я могу тебе помочь?`, startKeyboard);
});

bot.onText(/Записаться на услугу/,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай выберем услугу `, uslugiKeyboard );
  
})
bot.onText(/Нет,хочу другую услугу/,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай выберем услугу `, uslugiKeyboard );
  
})

bot.onText(/Вернуться к выбору услуги/,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай выберем услугу `, uslugiKeyboard );
  
})

bot.onText(/Главное меню/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Что тебя интересует?`, startKeyboard );
  
})

bot.onText(/Да,хочу записаться/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай выберем мастера`, masterKeyboard ); 
})

bot.onText(/Вернуться к выбору мастера/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай выберем мастера`, masterKeyboard ); 
})


bot.onText(/Мужская стрижка/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Мытье и подбор стрижки. Работа машинкой, ножницами, триммером, подбривание. Укладка профессиональными стайлингами.
  Цена: 33BYN.
  Хотите записаться?`, DaNetKeyboard ); 
})

bot.onText(/Стрижка бороды и усов/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Стрижка машинкой и ножницами, распаривание горячим полотенцем, оформление контуров, нанесение косметики.
  Цена: 25BYN.
  Хотите записаться?`, DaNetKeyboard ); 
})

bot.onText(/Стрижка машинкой/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Включает в себя мытье головы до и после процедуры. Работа выполняется машинкой, триммером, шейвером, а также подбривание шеи и висков.
  Цена: 25BYN.
  Хотите записаться?`, DaNetKeyboard ); 
})

bot.onText(/Классическое бритье/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Распаривание кожи, нанесение пены помазком, бритье лезвием в станке шаветт (опасная бритва).
  Цена: 25BYN.
  Хотите записаться?`, DaNetKeyboard ); 
})

bot.onText(/Детская стрижка/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Для детей возрастом от 4-х до 13-ти. Включает подбор стрижки по форме головы и чертам лица.
  Цена: 25BYN.
  Хотите записаться?`, DaNetKeyboard ); 
})

bot.onText(/Королевское бритье/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Королевское бритье - статусная услуга для настоящих джентльменов. Это настоящий обряд, состоящий из нескольких этапов.
  Цена: 40BYN.
  Хотите записаться?`, DaNetKeyboard ); 
})

bot.onText(/Отец \+ сын/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Включает в себя мужскую стрижку любого типа для отца и сына.Возраст не ограничен.
  Цена: 48BYN.
  Хотите записаться?`, DaNetKeyboard ); 
})

bot.onText(/Друг \+ друг/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Услуга предусматривает последовательное или параллельное обслуживание каждого джентльмена.
  Цена: 56BYN.
  Хотите записаться?`, DaNetKeyboard ); 
})

bot.onText(/Стрижка \+ бритье/i,(msg)=>{
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Это комплекс мужская стрижка + классическое бритье. Выполнять данные услуги единовременно выгоднее.
  Цена: 50BYN.
  Хотите записаться?`, DaNetKeyboard ); 
})


bot.on('message', msg =>{
  if (msg.text == 'Игорь Иванов' || msg.text == 'Егор Козлов' || msg.text=='Сергей Короткий' || msg.text =='Екатерина Антипенко' ){
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Укажите своё ФИО: `,NextKeyboard);
    
  }else if(msg.text=='Далее'){
    
    // client.query('INSERT INTO ', (err,res)=>{
    //   console.log(err, res)
    // })
  }
})



