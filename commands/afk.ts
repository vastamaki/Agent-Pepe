import Database from "better-sqlite3";

export default async (_, message, args) => {
  const sql = new Database(`./databases/${message.guild.id}.sqlite`);

  message.delete();

  if (!args[0]) {
    sql
      .prepare(`REPLACE INTO afk (id,afk) VALUES (${message.author.id}, false)`)
      .run();

    const replyMessage = await message.reply("AFK status cleared.");

    replyMessage.delete({ timeout: 5000 });

    return;
  }
  const reason = args.join(" ");

  sql
    .prepare(
      `REPLACE INTO afk (id,reason,afk) VALUES (${message.author.id}, '${reason}',true)`
    )
    .run();

  const replyMessage = await message.reply(
    `You are now in afk with status: ${reason}`
  );

  replyMessage.delete({ timeout: 5000 });
};
