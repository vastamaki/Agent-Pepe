import { cmd } from "../types";
import Database from "better-sqlite3";

export default async ({ client, message, options }: cmd) => {
  const sql = new Database(`./databases/${message.guildId}.sqlite`);

  message.delete();

  if (!options.args[0]) {
    sql
      .prepare(`REPLACE INTO afk (id,afk) VALUES (${message.author.id}, false)`)
      .run();

    const replyMessage = await message.reply("AFK status cleared.");

    setTimeout(() => replyMessage.delete(), 5000);

    return;
  }
  const reason = options.args.join(" ");

  sql
    .prepare(
      `REPLACE INTO afk (id,reason,afk) VALUES (${message.author.id}, '${reason}',true)`
    )
    .run();

  const replyMessage = await message.channel.send(
    `You are now in afk with status: ${reason}`
  );

  setTimeout(() => replyMessage.delete(), 5000);
};
