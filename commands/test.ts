import { cmd } from "../types";

export default async ({ client, message, options }: cmd) => {
  message.reply("Test command executed.");
};
