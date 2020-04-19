const SQLite = require("better-sqlite3");

exports.run = (client, message, args, role) => {
  const sql = new SQLite(`./databases/${message.guild.id}.sqlite`);
  message.delete();
  if (!args[0]) {
    sql
      .prepare(`REPLACE INTO afk (id,afk) VALUES (${message.author.id}, false)`)
      .run();
    message.reply("AFK status cleared.").then((message) => {
      message.delete({ timeout: 5000 });
    });
    return;
  }
  const reason = args.join(" ");
  sql
    .prepare(
      `REPLACE INTO afk (id,reason,afk) VALUES (${message.author.id}, '${reason}',true)`
    )
    .run();
  message.reply(`You are now in afk with status: ${reason}`).then((message) => {
    message.delete({ timeout: 5000 });
  });
};
