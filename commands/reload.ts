import { cmd } from "../types";

export default async ({ client, message, options }: cmd) => {
  if (!options.isAdmin) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  if (!options.args || options.args.length < 1)
    return message.reply("please provide a command name to reload.");

  const commandName = options.args[0];

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
