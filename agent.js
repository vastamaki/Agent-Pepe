const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

const config = require("./config.json");

client.config = config;
client.commands = new Collection();

const commands_dir = "./commands/";

client.on("error", console.error);

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  const eventName = file.split(".")[0];
  console.log(eventName);
  client.on(eventName, (...args) => {
    event(...args, client);
  });
}

const commandFiles = fs
  .readdirSync(commands_dir)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`${commands_dir}${file}`);
  const commandName = file.split(".")[0];
  client.commands.set(commandName, command);
  console.log(`Command ${commandName} loaded successfully!`);
}

client.login(config.token);
