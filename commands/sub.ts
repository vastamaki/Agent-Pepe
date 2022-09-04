import { EmbedBuilder } from "discord.js";

export default async (_, message, args) => {
  message.delete();
  if (!args[0]) {
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

    message.channel.send(EmbedMessage).then((message) => {
      message.delete({ timeout: 10000 });
    });
  } else {
    const allowedRoles = ["+NSFW"];
    if (allowedRoles.includes(args[0])) {
      message.member.roles.add(
        message.guild.roles.cache.find((role) => role.name === args[0])
      );
      message.reply(`Unsub successfull!`).then((message) => {
        message.delete({ timeout: 3000 });
      });
    } else {
      message.reply(
        `You are not allowed to give this role to yourself. Nice to try tho :)`
      );
    }
  }
};
