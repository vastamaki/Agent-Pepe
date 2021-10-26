const Discord = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.run = async (client, message) => {
  const url = "https://dog.ceo/api/breeds/image/random";

  const req = await fetch(url, {
    method: "GET",
  });

  const res = await req.json();

  let msg = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle("Doggo")
    .setImage(res.message);
  message.channel.send({ embeds: [msg] });
};
