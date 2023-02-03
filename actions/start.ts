import { bot } from "../config/index.ts";

bot.command("start", (ctx) => {
  ctx.reply(
    `Assalomu alaykum ${ctx.message.from.first_name}`,
  );
});
