const Discord = require("discord.js");
const ms = require("ms");

exports.run = async (client, message, args) => {
  if (!message.author.id == adminid) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }
  let tomute = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!tomute) return message.reply("Käyttäjää ei löydy.");
  if (tomute.hasPermission("MANAGE_MESSAGES"))
    return message.reply("Et voi mykistää tätä käyttäjää!");
  let muterole = message.guild.roles.find(`name`, "muted");

  let mutetime = args[1];
  if (!mutetime) return message.reply("Määritä aika!");

  await tomute.addRole(muterole.id);
  message.reply(
    `Käyttäjä <@${tomute.id}> on mykistetty ${ms(ms(mutetime))} ajaksi.`
  );

  setTimeout(function() {
    tomute.removeRole(muterole.id);
    message.channel.send(
      `Käyttäjän <@${tomute.id}> mykistys on nyt poistettu!`
    );
  }, ms(mutetime));
};
