import { ChannelType } from "discord.js";
import { cmd } from "../types";

const typeToNumber = (type: string) => {
  switch (type) {
    case "text":
      return ChannelType.GuildText;
    case "voice":
      return ChannelType.GuildVoice;
    default:
      break;
  }
};

export default async ({ client, message, options }: cmd) => {
  await message.guild?.channels.create({
    name: options.args[0],
    type: typeToNumber(options.args[1]),
    reason: "Needed a new channel",
  });
};
