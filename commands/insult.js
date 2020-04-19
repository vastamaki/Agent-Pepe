var request = require("request");

exports.run = async (client, message) => {
  message.delete();
  var url = "https://insult.mattbas.org/api/insult";
  request(url, function (error, response, body) {
    if (!error) {
      if (message.mentions.users.first()) {
        message.channel.send(`${message.mentions.users.first()} ${body}.`);
      } else {
        message.channel.send(`${body}.`);
      }
    } else {
      message.reply("There were problem with api. Try again later!");
    }
  });
};
