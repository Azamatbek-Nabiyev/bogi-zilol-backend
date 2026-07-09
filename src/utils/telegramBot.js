const { TelegramBot } = require('node-telegram-bot-api');
const { PendingSignUp } = require('../models');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// user /start <token> bilan kirganda
bot.onText(/\/start (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const token = match[1];

    const pending = await PendingSignUp.findOne({ token });

    if (!pending) {
        return bot.sendMessage(chatId, 'Havola notogri yoki muddati otgan. Saytga qaytib qaytadan urinib koring.');
    }

    pending.chatId = chatId;
    await pending.save();

    bot.sendMessage(chatId, 'Telefon raqamingizni tasdiqlash uchun quyidagi tugmani bosing:', {
        reply_markup: {
            keyboard: [[{ text: '📱 Raqamni ulashish', request_contact: true }]],
            one_time_keyboard: true,
            resize_keyboard: true
        }
    });
});

// /start token siz bosilsa (masalan login uchun qayta ochilsa)
bot.onText(/^\/start$/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Salom! Royxatdan otish uchun saytimizga tashrif buyuring. https://kun.uz');
});

// user "Raqamni ulashish" tugmasini bosganda
bot.on('contact', async (msg) => {
    const chatId = msg.chat.id;

    const pending = await PendingSignUp.findOne({ chatId });
    if (!pending) {
        return bot.sendMessage(chatId, 'Royxatdan otish jarayoni topilmadi. Saytdan qaytadan boshlang.');
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();

    pending.code = code;
    pending.codeExpiresAt = Date.now() + 5 * 60 * 1000; // 5 daqiqa
    await pending.save();

    bot.sendMessage(chatId, `✅ Raqam tasdiqlandi!\n\nSizning tasdiqlash kodingiz: *${code}*\n\nBu kodni saytga qaytib kiriting.`, {
        parse_mode: 'Markdown',
        reply_markup: { remove_keyboard: true }
    });
});

// login uchun kod yuborish funksiyasi (boshqa controllerlardan chaqiriladi)
const sendLoginCode = async (chatId, code) => {
    await bot.sendMessage(chatId, `Sizning kirish kodingiz: *${code}*\n\nBu kod 5 daqiqa amal qiladi.`, {
        parse_mode: 'Markdown'
    });
};

module.exports = { bot, sendLoginCode };