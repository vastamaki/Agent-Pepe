const helpers = require("../helpers/index");

module.exports = (client) => {
  console.log(
    `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
  );
  client.user.setPresence({
    activities: [{ name: "you", type: "WATCHING" }],
    status: "online",
  });

  helpers.initBot();
  helpers.initGuilds(client.guilds.cache);
};
