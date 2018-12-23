exports.run = async (client, message, args) => {
  if (!message.author.id == adminid) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  const deleteCount = parseInt(args[0], 10);

  if (!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.reply(
      "Please provide a number between 2 and 100 for the number of messages to delete"
    );

  const fetched = await message.channel.fetchMessages({
    limit: deleteCount
  });
  message.channel
    .bulkDelete(fetched)
    .catch(error =>
      message.reply(`Couldn't delete messages because of: ${error}`)
    );
  message.channel
    .send(`Removed ${deleteCount} messages.`)
    .then(msg => {
      msg.delete(3000);
    })
    .catch(console.log);
};
