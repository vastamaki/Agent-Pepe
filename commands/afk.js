exports.run = (client, message, args, role) => {
  message.delete();
  if (!args[0]) {
    sql.run(
      `UPDATE users SET afkreason = "" where id = "${message.author.id}"`
    );
    sql.run(
      `UPDATE users SET afkstatus = "0" where id = "${message.author.id}"`
    );
    message.reply("AFK status cleared.").then(msg => {
      msg.delete(5000);
    });
    return;
  }
  sql.get(`SELECT * FROM users WHERE id ="${message.author.id}"`).then(row => {
    if (!row) {
      var reason = args.join(" ");
      sql.run("INSERT INTO users (id, afkreason, afkstatus) VALUES (?, ?, ?)", [
        message.author.id,
        reason,
        "1"
      ]);
      message.reply(`You are now in afk with status: ${reason}`).then(msg => {
        msg.delete(5000);
      });
    } else {
      var reason = args.join(" ");
      sql.run(
        `UPDATE users SET afkstatus = "1" where id = "${message.author.id}"`
      );
      sql.run(
        `UPDATE users SET afkreason = "${reason}" where id = "${
          message.author.id
        }"`
      );
      message.reply(`You are now in afk with status: ${reason}`).then(msg => {
        msg.delete(5000);
      });
    }
  });
};
