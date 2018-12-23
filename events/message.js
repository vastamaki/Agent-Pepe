module.exports = (client, message) => {
  if (message.author.bot) return;

  if (message.mentions.users.first()) {
    sql
      .get(
        `SELECT * FROM users WHERE id ="${message.mentions.users.first().id}"`
      )
      .then(row => {
        if (row) {
          if (row.afkstatus == "1") {
            message.channel
              .send(
                `${message.mentions.users.first()} is afk. Msg from him: ${
                  row.afkreason
                }!`
              )
              .then(msg => {
                msg.delete(5000);
              });
          }
        }
      });
  }

  //no stuff under this line, it will never get runned.
  if (message.content.indexOf(client.config.prefix) !== 0) return;
  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  if (!cmd)
    return (
      message.delete(0) &&
      message.reply("This command doens't exists!").then(msg => {
        msg.delete(3000);
      })
    );

  cmd.run(client, message, args);
};
