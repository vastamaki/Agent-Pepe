import fetch from "node-fetch";
import { EmbedBuilder } from "discord.js";
import { cmd } from "../types";

export default async ({ client, message, options }: cmd) => {
  const req = await fetch("https://dog.ceo/api/breeds/image/random", {
    method: "GET",
  });

  const res: any = await req.json();

  const msg = new EmbedBuilder()
    .setColor("#ff9900")
    .setTitle("Doggo")
    .setImage(res.message);

  message.channel.send({ embeds: [msg] });
};
