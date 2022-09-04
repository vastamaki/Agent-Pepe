import Database from "better-sqlite3";
import { Client, Message, Collection } from "discord.js";
import { getOwnerId } from "../helpers";

interface DiscordClient extends Client {
  commands: Collection<unknown, any>;
}

const messageCreate = async (message: Message, client: DiscordClient) => {
  if (message.author.bot || !message.guildId) return;

  const sql = new Database(`./databases/${message.guildId}.sqlite`);

  const mentionedUser = message.mentions.users.first();

  if (mentionedUser) {
    const user = sql
      .prepare(`SELECT * FROM afk WHERE id ='${mentionedUser.id}'`)
      .get();

    if (user) {
      if (user.afk) {
        const replyMessage = await message.channel.send(
          `${message.mentions.users.first()} is afk. Status: ${user.reason}`
        );

        replyMessage.delete();
      }
    }
  }

  //no stuff under this line, it will never get runned.
  const { prefix } = sql.prepare(`SELECT * FROM config`).get();

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift();

  const cmd = client.commands.get(command);

  if (cmd) {
    const isAdmin = getOwnerId(message.guildId, message.author.id);
    return cmd(client, message, {
      args,
      isAdmin,
    });
  }

  const replyMessage = await message.reply(
    `Sorry, I haven't learnt that command yet.`
  );

  setTimeout(async () => {
    await replyMessage.delete();
    await message.delete();
  }, 3000);
};

export default messageCreate;
