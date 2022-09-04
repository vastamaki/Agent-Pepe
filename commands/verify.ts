import { ChannelType } from "discord.js";
import { cmd } from "../types";

export default async ({ client, message, options }: cmd) => {
  if (message.channel.type !== ChannelType.GuildText) return;
  if (message.channel.name !== "verify") return;

  const member = message.mentions.members?.first();

  await message.delete();

  if (options.isAdmin) {
    if (message.member?.roles.cache.has("Verified")) {
      return await message.channel.send(`${member} is already verified.`);
    }

    const role = message.guild?.roles.cache.find(
      (role) => role.name === "Verified"
    );
    if (role) {
      member?.roles.add(role);

      return message.channel.send(`${member} is now verified, woohoo!!!!`);
    }
  } else {
    if (message.member?.roles.cache.has("Verified")) {
      return message.reply(
        `want's to get verified. Waiting for admin approval.`
      );
    } else {
      return message.reply(`You are already verified!`);
    }
  }
};
