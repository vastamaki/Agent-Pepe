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
      .kick(reason)
      .catch((error) =>
        message.reply(`Couldn't kick member because of: ${error}`)
      );
    message.channel.send(
      `${member} just kicked from the server. Reason: ${reason}.`
    );
  } else {
    const replyMessage = await message.channel.send(
      "Please mention user to kick."
    );

    setTimeout(() => replyMessage.delete(), 3000);
  }
};
