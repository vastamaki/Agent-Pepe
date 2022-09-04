import { Client, Collection, Message } from "discord.js";

interface DiscordClient extends Client {
  commands: Collection<unknown, any>;
}

export interface cmd {
  client: DiscordClient;
  message: Message;
  options: Options;
}

interface Options {
  args: string[];
  isAdmin: boolean;
}
