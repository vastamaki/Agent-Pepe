exports.run = (client, message, args) => {
  const helpers = require("../helpers/index");
  if (!message.author.id == helpers.getOwnerID(message.guild.id)) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  message.reply("Test command executed.");
};
