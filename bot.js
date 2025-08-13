import axios from "axios";

import { config } from "dotenv";
config();
console.log(process.env.PORT);

const BOT_TOKEN = "8497548476:AAH14L-uRzQM-7zaw5ASknI5l5i_6wb7gEI";
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

/**
 * WebHook
 */
// kimdir => /start => telegram => server => mana senga javob

/**
 * Pooling
 */
// kimdir => /start => telgram <= server

async function getUpdates(offset) {
  console.log("offset ->", offset);

  const res = await axios.get(`${API_URL}/getUpdates?offset=${offset}`);
  console.log(res.data.result);

  for (let update of res.data.result) {
    const chatId = update.message.chat.id;
    const msg = update.message.text;

    if (msg == "/start") {
      await sendMessage(chatId, "Botimizga xush kelibsiz");
    } else if (msg == "/help") {
      await sendMessage(chatId, "Sizga tez orada yodam beramiz ");
    } else {
      await sendMessage(chatId, "Invalid msg");
    }

    // Foydalanuvchiga javob yuborish

    console.log("bu ishladi", update);

    offset = update.update_id + 1;
  }

  setTimeout(() => getUpdates(offset), 1000);
}

async function sendMessage(chatId, text) {
  await axios.post(`${API_URL}/sendMessage`, {
    chat_id: chatId,
    text: text,
  });
}

console.log("Bot ishladi");
await getUpdates(0);
