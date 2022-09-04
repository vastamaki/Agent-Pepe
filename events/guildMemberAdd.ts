import { Client, GuildMember, EmbedBuilder, ChannelType } from "discord.js";

const guildMemberAdd = async (member: GuildMember, client: Client) => {
  const memberRole = member.guild.roles.cache.find(
    (role) => role.name === "Member"
  );

  if (memberRole) {
    await member.roles.add(memberRole);
  }

  const message = new EmbedBuilder()
    .setColor(0x33cc66)
    .addFields([
      {
        name: `Who?`,
        value: `${member} joined.`,
      },
      {
        name: `Created at ?`,
        value: `${member.user.createdAt}`,
      },
    ])
    .setFooter({
      text: new Date().toISOString(),
    });

  const channel = client.channels.cache.get("528036888330633220");

  if (channel && channel.type === ChannelType.GuildText) {
    await channel.send({
      embeds: [message],
    });
  }
};

export default guildMemberAdd;
