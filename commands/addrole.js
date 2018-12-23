exports.run = (client, message, args, role) => {
  if (!message.author.id == adminid) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  if (message.mentions.members.first() && message.author.id == adminid) {
    var mentionedrole = args[1];
    let member = message.mentions.members.first();
    let role = message.guild.roles.find(role => role.name === mentionedrole);
    if (role == null && message.author.id == adminid) {
      message.reply("please enter correct role name.");
      return;
    }
    member.addRole(role.id);
  } else if (message.author.id != adminid) {
    message.reply("sorry, your permission level is too low.");
  } else if (!message.mentions.members.first()) {
    message.reply("please mention user first.");
  } else {
    message.reply("this command is currently in developement.");
  }
};
