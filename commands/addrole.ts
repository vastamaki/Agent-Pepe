import { cmd } from "../types";

export default async ({ client, message, options }: cmd) => {
  if (!options.isAdmin) {
    message.reply("Hmm. You dont have access to this command.");
    return;
  }

  const member = message.mentions.members?.first();

  if (member) {
    const mentionedrole = options.args[1];

    const role = message.guild?.roles.cache.find(
      (role) => role.name === mentionedrole
    );

    if (!role) {
      message.reply("I wasn't able to find that role :/");
      return;
    }

    await member.roles.add(role.id);
  } else {
    message.reply("Mention the user you want to assign this role to! :)");
  }
};
