module.exports = (client, member) => {
  member
    .addRole(member.guild.roles.find(r => r.name === "Member"))
    .catch(error => console.log(error));
  const msg = new Discord.RichEmbed()
    .setColor(0x33cc66)
    .addField(`Who?`, `${member} joined.`)
    .addField(`Created at ?`, `${member.user.createdAt}`)
    .setFooter(new Date());
  client.channels.get("528036888330633220").send(msg);
};
