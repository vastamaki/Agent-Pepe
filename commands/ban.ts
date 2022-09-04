import { cmd } from "../types";

export default async ({ client, message, options }: cmd) => {
  if (!options.isAdmin) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }

  message.delete();

  const member = message.mentions.members?.first();
  const reason = options.args.slice(1).join(" ");

  if (member) {
    member
      .ban({ reason: reason })
      .catch((error) =>
        message.reply(`Couldn't kick member because of: ${error}`)
      );
    message.channel.send(
      `${member} just got banned from the server ${
        reason ? "because of " + reason + "." : "."
      }`
    );
  } else {
    const replyMessage = await message.channel.send(
      "Please mention user to ban."
    );
    setTimeout(() => replyMessage.delete(), 3000);
  }
};
