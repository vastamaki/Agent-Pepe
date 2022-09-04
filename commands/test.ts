import { cmd } from "../types";

export default async ({ client, message, options }: cmd) => {
  console.log(options);
  message.reply("Test command executed.");
};
