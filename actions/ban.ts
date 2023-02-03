import { bot } from "../config/index.ts";

bot.command("ban", async (ctx) => {
  let msg = ctx.message;

  // user  who typed command
  let command_user = msg.from;
  // user who got replied
  let replied_user = msg.reply_to_message.from;

  // status
  let command_user_status = await bot.api.getChatMember(
    msg.chat.id,
    command_user.id,
  );
  let replied_user_status = await bot.api.getChatMember(
    msg.chat.id,
    replied_user.id,
  );

  if (command_user_status.status == "member") {
    await ctx.reply("Oddiy a'zolar ban bera olishmaydi!");
  } else {
    if (replied_user_status.status == "member") {
      await bot.api.banChatMember(msg.chat.id, replied_user.id);
      await ctx.reply(`${replied_user.first_name} ban qilindi!`);
    } else {
      await ctx.reply("Bu foydalanuvchini ban qilib bo'lmaydi!");
    }
  }
});
