import Database from "better-sqlite3";

const messageCreate = async (message, client) => {
  if (message.author.bot) return;
  const sql = new Database(`./databases/${message.guild.id}.sqlite`);

  const mentionedUser = message.mentions.users.first();

  if (mentionedUser) {
    const user = sql
      .prepare(`SELECT * FROM afk WHERE id ='${mentionedUser.id}'`)
      .get();

    if (user) {
      console.log(user);
      console.log(message.author);
      if (user.afk) {
        const replyMessage = await message.channel.send(
          `${message.mentions.users.first()} is afk. Status: ${user.reason}`
        );

        replyMessage.delete({ timeout: 5000 });
      }
    }
  }

  //no stuff under this line, it will never get runned.
  const { prefix } = sql.prepare(`SELECT * FROM config`).get();
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  if (cmd) {
    return cmd.run(client, message, args);
  }
  const replyMessage = await message.reply(
    `Sorry, i don't know command: ${command} :/`
  );

  await replyMessage.delete({ timeout: 3000 });
  await message.delete({ timeout: 3000 });
};

export default messageCreate;
