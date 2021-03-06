exports.run = (client, message, args) => {
  const helpers = require("../helpers/index");
  if (!message.author.id == helpers.getOwnerID(message.guild.id)) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  if (!args || args.size < 1)
    return message.reply("please provide a command name to reload.");

  const commandName = args[0];

  if (!client.commands.has(commandName)) {
    return message.reply("Seems that command does not exist :/");
  }
  delete require.cache[require.resolve(`./${commandName}.js`)];
  client.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  client.commands.set(commandName, props);
  message.delete();
  message.reply(`command ${commandName} has been reloaded :)`);
};
