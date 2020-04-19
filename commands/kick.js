exports.run = (client, message, args, role) => {
  const helpers = require("../helpers/index");
  if (!message.author.id == helpers.getOwnerID(message.guild.id)) {
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
    message.delete();
    message.channel.send(
      `${member} just kicked from the server. Reason: ${reason}.`
    );
  } else {
    message.delete();
    message.channel.send("Please mention user to kick.").then(message => {
      message.delete({"timeout": 3000});
    });
  }
};
