import { EmbedBuilder } from "discord.js";

export default async (_, message, args) => {
  message.delete();
  if (!args[0]) {
    const EmbedMessage = new EmbedBuilder().setColor(0x33cc66).addFields([
      {
        name: "Please type one of categories after subscribe!",
        value: "Example: ;unsub +NSFW",
      },
      {
        name: "+NSFW",
        value: "To remove access from nsfw channels.",
      },
    ]);
    message.channel.send(EmbedMessage).then((message) => {
      message.delete({ timeout: 10000 });
    });
  } else {
    message.member.roles.remove(
      message.guild.roles.cache.find((role) => role.name === args[0])
    );
    message.reply(`Unsub successfull!`).then((message) => {
      message.delete({ timeout: 3000 });
    });
  }
};
