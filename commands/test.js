exports.run = (client, message, args) => {
  if (!message.author.id == adminid) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  message.reply("Test command executed.");
};
