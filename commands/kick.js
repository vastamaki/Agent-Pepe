exports.run = (client, message, args, role) => {
  if (!message.author.id == adminid) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  member = message.mentions.members.first();
  reason = args.slice(1).join(" ");
  if (member) {
    member
      .kick(reason)
      .catch(error =>
        message.reply(`Couldn't kick member because of: ${error}`)
      );
    message.delete(0);
    message.channel.send(
      `${member} just kicked from the server. Reason: ${reason}.`
    );
  } else {
    message.delete(0);
    message.channel.send("Please mention user to kick.").then(msg => {
      msg.delete(3000);
    });
  }
};
