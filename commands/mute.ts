import { GuildMember, PermissionFlagsBits } from "discord.js";
import { cmd } from "../types";
import ms from "ms";

export default async ({ client, message, options }: cmd) => {
  if (!options.isAdmin) {
    return;
  }

  const tomute = (message.mentions.users.first() ||
    message.guild?.members.cache.get(options.args[0])) as GuildMember;

  if (!tomute) return message.reply("User not found.");

  if (tomute.permissions.has(PermissionFlagsBits.ManageMessages)) {
    return message.reply("Et voi mykistää tätä käyttäjää!");
  }

  const muterole = message.guild?.roles.cache.find(
    (role) => role.name === "muted"
  );

  if (!muterole) {
    return message.reply(
      "Please create role called 'muted' before using this command"
    );
  }

  const mutetime = options.args[1];

  if (!mutetime) return message.reply("Please define mute length!");

  await tomute.roles.add(muterole.id);

  message.reply(`User <@${tomute.id}> is now muted for ${ms(ms(mutetime))}`);

  setTimeout(async () => {
    await tomute.roles.remove(muterole.id);
    message.channel.send(`User <@${tomute.id}> is now unmuted!`);
  }, ms(mutetime));
};
