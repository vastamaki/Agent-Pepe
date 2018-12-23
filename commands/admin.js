exports.run = (client, message) => {
  sql.get(`SELECT * FROM admins`).then(row => {
    if (row) {
      message.reply("There is already admin. But nice try tho!")
    } else {
      sql.run("INSERT INTO admins (id) VALUES (?)", [message.author.id]).then(result => {
        global.adminid = message.author.id;
        message.reply("You are now admin!").then(msg => {
          msg.delete(3000);
        });
      })
    }
  }).catch(error => {
    console.log(error)
  })
};
