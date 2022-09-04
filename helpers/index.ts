import Database from "better-sqlite3";
import { mkdirSync, writeFile, existsSync } from "fs";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getOwnerId = (guildId: string, authorId: string) => {
  const sql = new Database(`./databases/${guildId}.sqlite`);
  const row: any = sql
    .prepare("SELECT * FROM admins WHERE id = ?")
    .get(authorId);

  return !!row;
};

export const initBot = () => {
  try {
    if (!existsSync("./databases")) {
      mkdirSync("databases");
    }
    if (!existsSync("./databases/servers.sqlite")) {
      writeFile("./databases/servers.sqlite", "", () => null);
    }
  } catch (err) {
    console.error(err);
  }

  const sql = new Database(`./databases/servers.sqlite`);

  sql
    .prepare(
      `CREATE TABLE IF NOT EXISTS servers(id INTEGER UNIQUE, owner BOOLEAN)`
    )
    .run();
};

export const initGuilds = (guilds) => {
  const server = new Database(`./databases/servers.sqlite`);

  guilds.forEach((guild) => {
    const existing = server
      .prepare(`SELECT * FROM servers WHERE id = ${guild.id}`)
      .get();

    const sql = new Database(`./databases/${guild.id}.sqlite`);

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
