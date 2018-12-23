exports.run = (client, message, args) => {
  message.delete();
  if (!args[0]) {
    const regemb = new Discord.RichEmbed()
      .setColor(0x33cc66)
      .addField(
        "Please type one of categories after subscribe!",
        "Example: ;sub gambling"
      )
      .addField("gambling", "Get access to gambling channels.")
      .addField("nsfw", "Get access to nsfw channels.");

    message.channel.send(regemb).then(msg => {
      msg.delete(10000);
    });
  } else if (args[0] == "gambling") {
    message.member.addRole(message.guild.roles.find(r => r.name === "Gambler"));
    message
      .reply(`now you should have access to gambling channels!`)
      .then(msg => {
        msg.delete(5000);
      });
  } else if (args[0] == "nsfw") {
    message.member.addRole(message.guild.roles.find(r => r.name === "+NSFW"));
    message.reply(`now you should have access to NSFW channels!`).then(msg => {
      msg.delete(5000);
    });
  }
};
