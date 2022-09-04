import { EmbedBuilder } from "discord.js";
import { cmd } from "../types";

const allowedRoles = ["+NSFW"];

export default async ({ client, message, options }: cmd) => {
  message.delete();
  if (!options.args[0]) {
    const EmbedMessage = new EmbedBuilder().setColor(0x33cc66).addFields([
      {
        name: "Please type one of categories after subscribe!",
        value: "Example: ;sub +NSFW",
      },
      {
        name: "+NSFW",
        value: "Access to NSFW channels",
      },
    ]);

    const replyMessage = await message.channel.send({
      embeds: [EmbedMessage],
    });

    setTimeout(() => replyMessage.delete(), 10000);
    return;
  }

  if (allowedRoles.includes(options.args[0])) {
    const role = message.guild?.roles.cache.find(
      (role) => role.name === options.args[0]
    );

    if (role) {
      message.member?.roles.add(role);
      const replyMessage = await message.reply(`Unsub successfull!`);

      setTimeout(() => replyMessage.delete(), 3000);
    }
  } else {
    message.reply(
      "You are not allowed to give this role to yourself. Nice to try tho :)"
    );
  }
};
