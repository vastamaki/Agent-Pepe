import { cmd } from "../types";

export default async ({ client, message, options }: cmd) => {
  message.channel.send({
    embeds: [
      {
        title: "Commands!",
        color: 65510,
        fields: [
          {
            name: ";addrole",
            value: "Usage: ;addrole <member> <role>",
          },
          {
            name: ";ban",
            value: "Usage: ;ban <username>",
          },
          {
            name: ";help",
            value: "Usage: ;help",
          },
          {
            name: ";kick",
            value: "Usage: ;kick <member> <optional reason>",
          },
          {
            name: ";purge",
            value: "Usage: ;purge <message count>",
          },
          {
            name: ";register",
            value: "Usage: TBA",
          },
          {
            name: ";reload",
            value: "Usage: ;reload <command name>",
          },
          {
            name: ";say",
            value: "Usage: ;say <optional channel> <message>",
          },
          {
            name: ";verify",
            value: "Usage: ;verify <if admin, member here>",
          },
        ],
      },
    ],
  });
};
