declare var require: any;

// Telegram setup
const Telegraf = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN).catch((e, ctx) => {
  console.error("Telegram error", e, ctx)
});

module.exports.bot = bot;
export {};
