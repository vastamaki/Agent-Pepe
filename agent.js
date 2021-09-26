const { Client, Intents } = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const config = require("./config.json");

client.config = config;
client.commands = new Enmap();

const commands_dir = "./commands/";

client.on("error", console.error);

client.on("interactionCreate", async (interaction) => {
  console.log(interaction);
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("primary")
        .setLabel("Primary")
        .setStyle("PRIMARY")
    );

    await interaction.reply({ content: "Pong!", components: [row] });
  }
});

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

fs.readdir(commands_dir, (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(commands_dir + file);
    let commandName = file.split(".")[0];
    console.log(`Command ${commandName} loaded successfully!`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);
