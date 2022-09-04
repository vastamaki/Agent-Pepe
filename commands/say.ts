import { ChannelType } from "discord.js";
import { cmd } from "../types";

export default async ({ client, message, options }: cmd) => {
  if (!options.isAdmin) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }

  await message.delete();

  if (message.mentions.channels.first()) {
    const destinationChannel = options.args[0].replace(/\D/g, "");
    const msg = options.args.slice(1).join(" ");
    const channel = client.channels.cache.get(destinationChannel);

    if (channel?.type === ChannelType.GuildText) {
      channel.send(msg);
    }
  } else {
    const msg = options.args.join(" ");
    message.channel.send(msg);
  }
};
