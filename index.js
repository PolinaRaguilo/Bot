const TelegramBot = require("node-telegram-bot-api");
const config = require("./config");


const pg = require("pg");
const client = new pg.Client(config.DB_URL);

client
  .connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.log(err));

const bot = new TelegramBot(config.TOKEN, { polling: true });



const startKeyboard = {
  reply_markup: {
    keyboard: [
      ["Записаться на услугу", "Отменить запись"],
      ["Изменить дату и время записи"],
      ["Изменить услугу"],
      ["Выход"],
    ],
  },
};

const uslugiKeyboard = {
  reply_markup: {
    keyboard: [
      ["Мужская стрижка", "Стрижка бороды и усов", "Стрижка машинкой"],
      ["Классическое бритье", "Детская стрижка", "Королевское бритье"],
      ["Отец + сын", "Друг + друг", "Стрижка + бритье"],
      ["Главное меню"],
    ],
  },
};

let masterKeyboard = {
  reply_markup: JSON.stringify({
    keyboard: [
      ["Игорь Иванов", "Егор Козлов"],
      ["Сергей Короткий", "Екатерина Антипенко"],
      ["Вернуться к выбору услуги"],
    ],
    resize_keyboard: true,
  }),
};

let GlavnoeMenuKeyboard = {
  reply_markup: JSON.stringify({
    keyboard: [
      ["Вернуться в главное меню"],
    ],
    resize_keyboard: true,
  }),
};

let DaNetKeyboard = {
  reply_markup: JSON.stringify({
    keyboard: [["Да,хочу записаться", "Нет,хочу другую услугу"]],
    resize_keyboard: true,
  }),
};

let BackToChooseMasterKeyboard = {
  reply_markup: JSON.stringify({
    keyboard: [["Вернуться к выбору мастера"]],
    resize_keyboard: true,
  }),
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `Привет, ${msg.from.first_name}.Чем я могу тебе помочь?`,
    startKeyboard
  );
});

bot.onText(/Записаться на услугу/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай выберем услугу `, uslugiKeyboard);
});
bot.onText(/Нет,хочу другую услугу/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай выберем услугу `, uslugiKeyboard);
});

bot.onText(/Вернуться к выбору услуги/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай выберем услугу `, uslugiKeyboard);
});

bot.onText(/Главное меню/i, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Что тебя интересует?`, startKeyboard);
});

bot.onText(/Да,хочу записаться/i, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай выберем мастера`, masterKeyboard);
});

bot.onText(/Вернуться к выбору мастера/i, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Давай выберем мастера`, masterKeyboard);
});

let usluga;
bot.onText(/Мужская стрижка/i, (msg) => {
  const chatId = msg.chat.id;
  usluga = msg.text;
  console.log(usluga);
  bot.sendMessage(
    chatId,
    `Мытье и подбор стрижки. Работа машинкой, ножницами, триммером, подбривание. Укладка профессиональными стайлингами.
  Цена: 33BYN.
  Хотите записаться?`,
    DaNetKeyboard
  );
});

bot.onText(/Стрижка бороды и усов/i, (msg) => {
  const chatId = msg.chat.id;
  usluga = msg.text;
  bot.sendMessage(
    chatId,
    `Стрижка машинкой и ножницами, распаривание горячим полотенцем, оформление контуров, нанесение косметики.
  Цена: 25BYN.
  Хотите записаться?`,
    DaNetKeyboard
  );
});

bot.onText(/Стрижка машинкой/i, (msg) => {
  const chatId = msg.chat.id;
  usluga = msg.text;
  bot.sendMessage(
    chatId,
    `Включает в себя мытье головы до и после процедуры. Работа выполняется машинкой, триммером, шейвером, а также подбривание шеи и висков.
  Цена: 25BYN.
  Хотите записаться?`,
    DaNetKeyboard
  );
});

bot.onText(/Классическое бритье/i, (msg) => {
  const chatId = msg.chat.id;
  usluga = msg.text;
  bot.sendMessage(
    chatId,
    `Распаривание кожи, нанесение пены помазком, бритье лезвием в станке шаветт (опасная бритва).
  Цена: 25BYN.
  Хотите записаться?`,
    DaNetKeyboard
  );
});

bot.onText(/Детская стрижка/i, (msg) => {
  const chatId = msg.chat.id;
  usluga = msg.text;
  bot.sendMessage(
    chatId,
    `Для детей возрастом от 4-х до 13-ти. Включает подбор стрижки по форме головы и чертам лица.
  Цена: 25BYN.
  Хотите записаться?`,
    DaNetKeyboard
  );
});

bot.onText(/Королевское бритье/i, (msg) => {
  const chatId = msg.chat.id;
  usluga = msg.text;
  bot.sendMessage(
    chatId,
    `Королевское бритье - статусная услуга для настоящих джентльменов. Это настоящий обряд, состоящий из нескольких этапов.
  Цена: 40BYN.
  Хотите записаться?`,
    DaNetKeyboard
  );
});

bot.onText(/Отец \+ сын/i, (msg) => {
  const chatId = msg.chat.id;
  usluga = msg.text;
  bot.sendMessage(
    chatId,
    `Включает в себя мужскую стрижку любого типа для отца и сына.Возраст не ограничен.
  Цена: 48BYN.
  Хотите записаться?`,
    DaNetKeyboard
  );
});

bot.onText(/Друг \+ друг/i, (msg) => {
  const chatId = msg.chat.id;
  usluga = msg.text;
  bot.sendMessage(
    chatId,
    `Услуга предусматривает последовательное или параллельное обслуживание каждого джентльмена.
  Цена: 56BYN.
  Хотите записаться?`,
    DaNetKeyboard
  );
});

bot.onText(/Стрижка \+ бритье/i, (msg) => {
  const chatId = msg.chat.id;
  usluga = msg.text;
  bot.sendMessage(
    chatId,
    `Это комплекс мужская стрижка + классическое бритье. Выполнять данные услуги единовременно выгоднее.
  Цена: 50BYN.
  Хотите записаться?`,
    DaNetKeyboard
  );
});

bot.on("message", (msg) => {
  if (
    msg.text == "Игорь Иванов" ||
    msg.text == "Егор Козлов" ||
    msg.text == "Сергей Короткий" ||
    msg.text == "Екатерина Антипенко"
  ) {
    const chatId = msg.chat.id;
    let master = msg.text;
    bot.sendMessage(
      chatId,
      `Укажите своё ФИО в формате: 
  /fio Фамилия Имя и отправьте`,
      BackToChooseMasterKeyboard
    );
    bot.onText(/\/fio/i, (msg, match) => {
      const chatId = msg.chat.id;
      let input = msg.text.split(" ");
      console.log(input);
      let familiya = input[1];
      let imya = input[2];
      console.log(familiya, imya, master);
      bot.sendMessage(
        chatId,
        `Укажите свой номер телефона,оператор и почту: 
      /contact номер оператор почта`,
        BackToChooseMasterKeyboard
      );
      bot.onText(/\/contact/i, (msg, match) => {
        const chatId = msg.chat.id;
        let contact = msg.text.split(" ");
        let nomer = contact[1];
        let operator = contact[2];
        let email = contact[3];
        client.query(
          `INSERT INTO clients (email,imya,familiya,mobile_operator,mobile)  VALUES ($1,$2,$3,$4,$5)`,
          [email, imya, familiya, operator, nomer],
          (err, res) => {
            console.log("запись в бд прошла успешно", err);
          }
        );
        bot.sendMessage(
          chatId,
          `Отлично, теперь давай выберем дату и время.Когда тебе удобно?
            Пропиши  /dataTime ,а затем дату и время:
            /dataTime ГГГГ-ММ-ДД ЧЧ:ММ`
        );
        bot.onText(/\/dataTime/i, (msg, match) => {
          const chatId = msg.chat.id;
          let dataTime = msg.text.split(" ");
          let data = dataTime[1];
          let time = dataTime[2];
          let username = msg.from.username;
          console.log(usluga);
          client.query(`INSERT INTO zapis (id_clients,id_uslugi,data,vremya,usernameintelegram,master)  VALUES ((SELECT id FROM clients where imya=$1 and familiya=$2),(SELECT id FROM uslugi where name_uslugi=$3),$4,$5,$6,$7)`,[imya,familiya,usluga,data,time,username,master],(err, res) => {
            try{
              console.log(res,err);
              bot.sendMessage(
                chatId,
                `Отлично! Ты успешно записан в BarberShop! До встречи!`, GlavnoeMenuKeyboard
              );
            }catch{
              bot.sendMessage(
                chatId,
                `Упс..., что-то пошло не так. Попробуй ещё раз`
              );
            }
              
              
            }
          );

        });
      });
    });
  }
});
