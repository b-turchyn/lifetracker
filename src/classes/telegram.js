"use strict";
exports.__esModule = true;
var Telegraf = require("telegraf");
var bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot = bot.catch((e, ctx) => {
  console.error("Telegram error", e, ctx);
});

module.exports.bot = bot;
//# sourceMappingURL=telegram.js.map
