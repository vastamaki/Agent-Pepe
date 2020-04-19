exports.run = (client, message) => {
  const helpers = require("../helpers/index");
  if (message.channel.name == "verify") {
    let member = message.mentions.members.first();

    if (member && !message.author.id == helpers.getOwnerID(message.guild.id)) {
      if (member.roles.some((r) => ["Verified"].includes(r.name))) {
        message.delete();
        return message.channel.send(`${member} is already verified.`);
      } else {
        message.delete();
        let role = message.guild.roles.find((r) => r.name === "Verified");
        member
          .addRole(role)
          .catch((error) =>
            message.reply(`Couldn't verify member because of: ${error}`)
          );
        return message.channel.send(`${member} is now verified, woohoo!!!!`);
      }
    }

    if (!message.member.roles.some((r) => ["Verified"].includes(r.name))) {
      message.delete();
      return message.reply(
        `want's to get verified. Waiting for admin approval.`
      );
    } else {
      message.delete();
      return message.reply(`You are already verified!`);
    }
  }
};
