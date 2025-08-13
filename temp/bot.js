import axios from "axios";

// config
const TOKEN = "8467421393:AAF7TV7ibZ2cns6UDhJH5vz958nrNzXZbcY"; // @BotFather dan olingan token
const API_URL = `https://api.telegram.org/bot${TOKEN}`;

// update olish funksiyasi
async function getUpdates(offset) {
  console.log("offset ->", offset);

  const res = await axios.get(`${API_URL}/getUpdates?offset=${offset}`);
  console.log(res.data.result);
  

  for (let update of res.data.result) {
    const chatId = update.message.chat.id;
    const msg = update.message.text;

    // Foydalanuvchiga javob yuborish
    await sendMessage(chatId, msg);

    console.log("bu ishladi", update);

    offset = update.update_id + 1;
  }

  setTimeout(() => getUpdates(offset), 1000);
}

// xabar yuborish funksiyasi
async function sendMessage(chatId, text) {
  const url = `${API_URL}/sendMessage`;
  await axios.post(url, {
    chat_id: chatId,
    text: text,
    reply_markup: {
      keyboard: [["Salom", "Nima gaplar"]],
      resize_keyboard: true
    },
  });
}

// botni ishga tushirish
console.log("Bot ishga tushdi...");
await getUpdates(0);

/**
 * Webhook
 */
// Kimdir => /start => telegram => server => mana senga javob

/**
 * Pooling
 */
// Kimdir => /start => telegram <= server
