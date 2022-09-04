import { ChannelType } from "discord.js";
import { cmd } from "../types";

export default async ({ client, message, options }: cmd) => {
  if (!options.isAdmin) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  const deleteCount = parseInt(options.args[0], 10);

  if (!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.reply(
      "Please provide a number between 2 and 100 for the number of messages to delete"
    );

  if (message.channel.type === ChannelType.GuildText) {
    await message.channel.bulkDelete(deleteCount);
  }

  const replyMessage = await message.channel.send(
    `Removed ${deleteCount} messages.`
  );

  setTimeout(() => replyMessage.delete(), 3000);
};
