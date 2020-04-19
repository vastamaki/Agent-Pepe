exports.run = (client, message, args) => {
  const helpers = require("../helpers/index");
  if (!message.author.id == helpers.getOwnerID(message.guild.id)) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  if (message.mentions.channels.first()) {
    let channel = args[0];
    const message = args.slice(1).join(" ");
    channel = channel.replace(/\D/g, "");
    message.delete();
    client.channels.get(channel).send(message);
  } else {
    message.delete();
    const msg = args.join(" ");
    message.channel.send(msg);
  }
};
