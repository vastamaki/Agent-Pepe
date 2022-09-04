import { cmd } from "../types";

export default async ({ client, message, options }: cmd) => {
  message.channel.send({
    embeds: [
      {
        url: "https://discordapp.com",
        color: 1423456,
        fields: [
          {
            name: "Who?",
            value: "Rainmaker#6885 has created me.",
          },
          {
            name: "Why?",
            value: "Just for fun :)",
          },
          {
            name: "Coffee? Coffee.",
            value:
              "If you are the type of person who digs attention to detail, know how much work is involved in it and/or simply likes to support makers with a coffee or a beer, I would greatly appreciate your donation",
          },
          {
            name: "Where can i donate?",
            value: "Thanks for considering this, please DM me:)",
          },
        ],
      },
    ],
  });
};
