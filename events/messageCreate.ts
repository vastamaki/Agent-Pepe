import { Client, Message, Collection } from "discord.js";
import { db } from "index";
import { isAdmin } from "../helpers";

interface DiscordClient extends Client {
  commands: Collection<unknown, any>;
}

interface Server {
  id: number;
  owner: number;
  prefix: string;
}

const messageCreate = async (message: Message, client: DiscordClient) => {
  if (message.author.bot || !message.guildId) return;

  const { prefix }: Server = await db("servers")
    .select("*")
    .where("guildId", "=", message.guildId)
    .first();

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift();

  const cmd = client.commands.get(command);

  if (cmd) {
    return await cmd({
      client,
      message,
      options: {
        args,
        isAdmin: await isAdmin(message.guildId, message.author.id),
      },
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
