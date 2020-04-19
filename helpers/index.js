const fs = require("fs");
const SQLite = require("better-sqlite3");

const getOwnerID = (guildID) => {
  const sql = new SQLite(`./databases/${guildID}.sqlite`);
  const row = sql.prepare(`SELECT * FROM admins`).get();
  if (row) {
    console.log(`Admin found`);
    return row.id;
  }
};

const initBot = () => {
  const sql = new SQLite(`./databases/servers.sqlite`);
  sql
    .prepare(
      `CREATE TABLE IF NOT EXISTS servers(id INTEGER UNIQUE, owner BOOLEAN)`
    )
    .run();
};

const initGuilds = (guilds) => {
  guilds.forEach((guild) => {
    const server = new SQLite(`./databases/servers.sqlite`);
    const existing = server
      .prepare(`SELECT * FROM servers WHERE id = ${guild.id}`)
      .get();
    if (!existing) {
      server
        .prepare(
          `INSERT INTO servers (id,owner) VALUES (${guild.id}, ${guild.ownerID})`
        )
        .run();
      console.log(`${guild.id} is missing from database, creation started!`);
      const sql = new SQLite(`./databases/${guild.id}.sqlite`);
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
          `CREATE TABLE IF NOT EXISTS users(id INTEGER UNIQUE, afk BOOLEAN)`
        )
        .run();
      sql
        .prepare(
          `CREATE TABLE IF NOT EXISTS channels(id INTEGER UNIQUE, type STRING)`
        )
        .run();
      sql
        .prepare(
          `CREATE TABLE IF NOT EXISTS afk(id INTEGER UNIQUE, afk BOOLEAN, reason STRING)`
        )
        .run();
      sql
        .prepare(
          `REPLACE INTO admins (id, owner) VALUES (${guild.ownerID}, true)`
        )
        .run();
      sql.prepare(`REPLACE INTO config (prefix) VALUES (';')`).run();
    }
  });
};

module.exports = {
  getOwnerID,
  initGuilds,
  initBot,
};
