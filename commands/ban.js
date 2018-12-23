exports.run = (client, message, args, role) => {
  if (!message.author.id == adminid) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  member = message.mentions.members.first();
  reason = args.slice(1).join(" ");
  if (member) {
    member
      .ban(reason)
      .catch(error =>
        message.reply(`Couldn't kick member because of: ${error}`)
      );
    message.delete(0);
    message.channel.send(
      `${member} just banned from the server because ${reason}.`
    );
  } else {
    message.delete(0);
    message.channel.send("Please mention user to ban.").then(msg => {
      msg.delete(3000);
    });
  }
};
