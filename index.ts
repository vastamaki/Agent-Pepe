import * as dotenv from "dotenv";
dotenv.config({ path: "./stack.env" });

import knex from "knex";
import { Client, GatewayIntentBits, Collection } from "discord.js";
import events from "./events";
import commands from "./commands";

export const db = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
  },
  pool: {
    min: 1,
    max: 1,
  },
});

const eventFiles = Object.keys(events);
const commandFiles = Object.keys(commands);

interface DiscordClient extends Client {
  commands: Collection<unknown, any>;
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
}) as DiscordClient;

client.commands = new Collection();

client.on("error", console.error);

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

for (const event of eventFiles) {
  client.on(event, (...args) => events[event](...args, client));
  console.log(`Event ${event} loaded successfully!`);
}

for (const file of commandFiles) {
  client.commands.set(file, commands[file]);
  console.log(`Command ${file} loaded successfully!`);
}

client.login(process.env.DISCORD_BOT_TOKEN);
