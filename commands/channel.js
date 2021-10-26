exports.run = async (client, message, args, role) => {
  message.guild.channels
    .create("new-general", {
      reason: "Needed a cool new channel",
      parent: {
        id: 498876534736683049,
      },
    })
    .then(console.log)
    .catch(console.error);
};
