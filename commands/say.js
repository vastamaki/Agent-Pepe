exports.run = (client, message, args) => {
  if (!message.author.id == adminid) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  if (message.mentions.channels.first()) {
    let channel = args[0];
    const msg = args.slice(1).join(" ");
    channel = channel.replace(/\D/g, "");
    message.delete();
    client.channels.get(channel).send(msg);
  } else {
    const msg = args.join(" ");
    message.delete();
    message.channel.send(msg);
  }
};
