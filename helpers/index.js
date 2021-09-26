const SQLite = require("better-sqlite3");
const fs = require("fs");

const getOwnerID = (guildID) => {
  const sql = new SQLite(`./databases/${guildID}.sqlite`);
  const row = sql.prepare(`SELECT * FROM admins`).get();
  if (row) {
    console.log(`Admin found`);
    return row.id;
  }
};

const initBot = () => {
  try {
    if (!fs.existsSync("./databases")) {
      fs.mkdirSync("databases");
    }
    if (!fs.existsSync("./databases/servers.sqlite")) {
      fs.writeFile("./databases/servers.sqlite", "", () => null);
    }
  } catch (err) {
    console.error(err);
  }

  const sql = new SQLite(`./databases/servers.sqlite`);
  sql
    .prepare(
      `CREATE TABLE IF NOT EXISTS servers(id INTEGER UNIQUE, owner BOOLEAN)`
    )
    .run();
};

const initGuilds = (guilds) => {
  const server = new SQLite(`./databases/servers.sqlite`);
  guilds.forEach((guild) => {
    const existing = server
      .prepare(`SELECT * FROM servers WHERE id = ${guild.id}`)
      .get();

    const sql = new SQLite(`./databases/${guild.id}.sqlite`);

    if (!existing) {
      server
        .prepare(
          `INSERT INTO servers (id,owner) VALUES (${guild.id}, ${guild.ownerId})`
        )
        .run();
      console.log(`${guild.id} is missing from database, creation started!`);

      sql
        .prepare(
          `CREATE TABLE IF NOT EXISTS admins(id INTEGER UNIQUE, owner BOOLEAN)`
        )
        .run();
      sql
        .prepare(
          `CREATE TABLE IF NOT EXISTS config(prefix STRING UNIQUE DEFAULT ';')`
        )
        .run();

      sql
        .prepare(
          `REPLACE INTO admins (id, owner) VALUES (${guild.ownerId}, true)`
        )
        .run();
      sql.prepare(`REPLACE INTO config (prefix) VALUES (';')`).run();
    }
    sql
      .prepare(
        `CREATE TABLE IF NOT EXISTS users(id INTEGER UNIQUE, afk BOOLEAN)`
      )
      .run();
    sql
      .prepare(
        `CREATE TABLE IF NOT EXISTS afk(id INTEGER UNIQUE, afk BOOLEAN, reason STRING)`
      )
      .run();
    sql
      .prepare(
        `CREATE TABLE IF NOT EXISTS channels(id INTEGER UNIQUE, channelId STRING, ttl STRING)`
      )
      .run();
  });
};

module.exports = {
  getOwnerID,
  initGuilds,
  initBot,
};
