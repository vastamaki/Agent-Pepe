const Discord = require("discord.js");
var request = require("request");

exports.run = async (client, message, args) => {
  var url = "https://dog.ceo/api/breeds/image/random";
  var jsonObject;
  request(url, function(error, response, body) {
    if (!error) {
      jsonObject = JSON.parse(body);
      let doge = new Discord.RichEmbed()
        .setColor("#ff9900")
        .setTitle("Doggo")
        .setImage(jsonObject.message);
      message.channel.send(doge);
    }
  });
};
