exports.run = (client, message, args) => {
  message.delete();
  if (!args[0]) {
    const regemb = new Discord.RichEmbed()
      .setColor(0x33cc66)
      .addField(
        "Please type one of categories after subscribe!",
        "Example: ;sub gambling"
      )
      .addField("gambling", "To remove access from gambling channels.")
      .addField("nsfw", "To remove access from nsfw channels.");

    message.channel.send(regemb).then(msg => {
      msg.delete(10000);
    });
  } else if (args[0] == "gambling") {
    message.member.removeRole(
      message.guild.roles.find(r => r.name === "Gambler")
    );
    message.reply(`Unsub successfull!`).then(msg => {
      msg.delete(5000);
    });
  } else if (args[0] == "nsfw") {
    message.member.removeRole(
      message.guild.roles.find(r => r.name === "+NSFW")
    );
    message.reply(`Unsub successfull!`).then(msg => {
      msg.delete(5000);
    });
  }
};
