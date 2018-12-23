var request = require("request");

exports.run = async (client, message, args) => {
  message.delete();
  var url = "https://insult.mattbas.org/api/insult";
  request(url, function(error, response, body) {
    if (!error) {
      if (message.mentions.users.first()) {
        message.channel.send(
          `${message.mentions.users.first()} ${response.body}.`
        );
      } else {
        message.channel.send(`${response.body}.`);
      }
    } else {
      message.reply("There were problem with api. Try again later!");
    }
  });
};
