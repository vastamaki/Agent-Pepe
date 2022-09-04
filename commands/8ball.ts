import { cmd } from "../types";

export default async ({ client, message, options }: cmd) => {
  var texts = [
    "Yes",
    "No",
    "Maybe",
    "Absolutely yes",
    "Absolutely no",
    "Noope!",
    "Yeeeaaa!",
    "Hell no!",
    "Hell yea!",
    "I think yes",
    "I think.. MAYBE!!!",
    "Bruhh..",
    "I think so..",
    "I dont think so..",
    "No, you are..",
    ":DD",
    "Why you ask that from me ?",
    "Loool, gtfo",
    "Have fun.. YYES!!",
    "How much is 1+1? Correct, it's three!",
    "Your mother would be proud of you!",
    "Nahh, in ur dreams..",
    "Not even in ur dreams.",
    "Maybe some day :-D",
    "Not today.",
    "Maybe tomorrow! Or not.",
    "Uhm.. I dont answer for that..",
    "Oh, maybe.",
    "Huehue, NO.",
    "Ayy, lmao!",
    "IDK",
    "I know the answer... but i won't tell it.",
  ];

  const pick = texts[Math.floor(Math.random() * texts.length)];
  message.channel.send(pick);
};
