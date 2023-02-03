import { bot } from "../config/index.ts";

bot.command("mute", async (ctx) => {
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

  let permissions = {
    can_send_messages: false,
  };
  console.log(replied_user_status.status)
  if (msg.reply_to_message) {
    if (command_user_status.status == "member") {
      await ctx.reply("Oddiy a'zolar mute bera olishmaydi!");
    } else {
      if (replied_user_status.status == "member") {
        await bot.api.restrictChatMember(
          msg.chat.id,
          replied_user.id,
          permissions,
        );
        await ctx.reply(`${replied_user.first_name} mute qilindi!`);
      } else {
        await ctx.reply("Bu foydalanuvchini mute qilib bo'lmaydi!");
      }
    }
  } else {
    await ctx.reply("Foydalanuvchini ko'rsating!");
  }
});
