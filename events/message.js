const SQLite = require("better-sqlite3");

module.exports = (client, message) => {
  if (message.author.bot) return;
  const sql = new SQLite(`./databases/${message.guild.id}.sqlite`);
  const mentionedUser = message.mentions.users.first();
  if (mentionedUser) {
    const user = sql
      .prepare(`SELECT * FROM afk WHERE id ='${mentionedUser.id}'`)
      .get();
    if (user) {
      console.log(user);
      console.log(message.author);
      if (user.afk == true) {
        message.channel
          .send(
            `${message.mentions.users.first()} is afk. Status: ${user.reason}`
          )
          .then((message) => {
            message.delete({ timeout: 5000 });
          });
      }
    }
  }

  //no stuff under this line, it will never get runned.
  const prefix = sql.prepare(`SELECT * FROM config`).get().prefix;
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  if (!cmd)
    return (
      message.delete() &&
      message
        .reply(`Sorry, i don't know command: ${command} :/`)
        .then((message) => {
          message.delete({ timeout: 3000 });
        })
    );

  cmd.run(client, message, args);
};
