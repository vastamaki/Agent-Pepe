exports.run = (client, message, channel, args) => {
  message.channel.send({
    embed: {
      url: "https://discordapp.com",
      color: 1423456,
      fields: [
        {
          name: "Who?",
          value: "Cryptic#8783 has created me."
        },
        {
          name: "Why?",
          value: "I don't even know, I just like programming alot lol :-)"
        },
        {
          name: "Coffee? Coffee.",
          value:
            "If you are the type of person who digs attention to detail, know how much work is involved in it and/or simply likes to support makers with a coffee or a beer, I would greatly appreciate your donation"
        },
        {
          name: "Want send some coffee ??",
          value: "I would appreciate it very much. https://paypal.me/CrypticFin"
        }
      ]
    }
  });
};
