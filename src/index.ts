import { Client, GatewayIntentBits, Collection } from "discord.js";
import { readdirSync } from "fs";
import events from "./events";
import commands from "./commands";

console.log(commands);
console.log(events);

interface DiscordClient extends Client {
  commands: Collection<unknown, any>;
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
}) as DiscordClient;

client.commands = new Collection();

client.on("error", console.error);

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

const allEvents = Object.keys(events);

for (const event of allEvents) {
  client.on(event, (...args) => allEvents[event](...args, client));
  console.log(`Event ${event} loaded successfully!`);
}

const commandFiles = readdirSync(`@commands/commands`).filter((file) =>
  file.endsWith(".ts")
);

for (const file of commandFiles) {
  const command = await import(`@commands/commands/${file}`);
  const commandName = file.split(".")[0];

  client.commands.set(commandName, command);
  console.log(`Command ${commandName} loaded successfully!`);
}

client.login(process.env.DISCORD_BOT_TOKEN);
