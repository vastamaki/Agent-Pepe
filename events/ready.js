module.exports = (client, message) => {
  const db = require('../database')
  console.log(`DATABASE: ${db}`)
  console.log(
    `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
  );
  client.user.setPresence({
    activity: { name: "with something" },
    status: "idle",
  });

  sql.run(`CREATE TABLE IF NOT EXISTS admins(id INTEGER)`).then((result) => {
    sql
      .get(`SELECT * FROM admins`)
      .then((row) => {
        if (row) {
          console.log(row);
          global.adminid = row.id;
          console.log(`Admin found, ${row.id}`);
        } else {
          console.log(
            "There is no admin, please register admin using command ;admin"
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
