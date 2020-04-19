const Discord = require("discord.js");
var request = require("request");

exports.run = async () => {
  const url = "https://dog.ceo/api/breeds/image/random";
  request(url, function (error, response, body) {
    if (!error) {
      const res = JSON.parse(body);
      let message = new Discord.RichEmbed()
        .setColor("#ff9900")
        .setTitle("Doggo")
        .setImage(res.message);
      message.channel.send(message);
    }
  });
};
