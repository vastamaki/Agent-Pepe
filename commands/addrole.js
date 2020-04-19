exports.run = (client, message, args) => {
  const helpers = require('../helpers/index')
  if (!message.author.id == helpers.getOwnerID(message.guild.id)) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  if (message.mentions.members.first()) {
    var mentionedrole = args[1];
    let member = message.mentions.members.first();
    let role = message.guild.roles.cache.find((role) => role.name === mentionedrole);
    if (role == null) {
      message.reply("I was not able to find that role :/");
      return;
    }
    member.roles.add(role.id).catch(err => console.log(err))
  } else if (!message.mentions.members.first()) {
    message.reply("Mention the user you want to assign this role to! :)");
  }
};
