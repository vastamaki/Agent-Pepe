import { getOwnerID } from "helpers";

export default async (_, message, args) => {
  if (!message.author.id === getOwnerID(message.guild.id)) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  const member = message.mentions.members.first();
  const reason = args.slice(1).join(" ");
  if (member) {
    member
      .ban({ reason: reason })
      .catch((error) =>
        message.reply(`Couldn't kick member because of: ${error}`)
      );
    message.delete();
    message.channel.send(
      `${member} just got banned from the server ${
        reason ? "because of " + reason + "." : "."
      }`
    );
  } else {
    message.delete();
    message.channel.send("Please mention user to ban.").then((message) => {
      message.delete({ timeout: 3000 });
    });
  }
};
