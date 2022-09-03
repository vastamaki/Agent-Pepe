import { getOwnerID } from "helpers";

export default async (_, message) => {
  if (!message.author.id === getOwnerID(message.guild.id)) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  message.reply("Test command executed.");
};
