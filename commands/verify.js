exports.run = (client, message, args) => {
  if (message.channel.name == "verify") {
    let member = message.mentions.members.first();
    if (member && message.author.id == adminid) {
      if (member.roles.some(r => ["Verified"].includes(r.name))) {
        message.delete(0);
        return message.channel.send(`${member} is already verified.`);
      } else {
        message.delete(0);
        let role = message.guild.roles.find(r => r.name === "Verified");
        member
          .addRole(role)
          .catch(error =>
            message.reply(`Couldn't verify member because of: ${error}`)
          );
        return message.channel.send(`${member} is now verified, woohoo!!!!`);
      }
    }
    if (!message.member.roles.some(r => ["Verified"].includes(r.name))) {
      message.delete(0);
      return message.reply(
        `want's to get verified. Waiting for admin approval.`
      );
    } else {
      message.delete(0);
      return message.reply(`You are already verified!`);
    }
  } else {
    message.channel.send("ay");
    message.delete();
  }
};
