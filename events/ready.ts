import { initBot, initGuilds } from "../helpers";
import { joinVoiceChannel } from "@discordjs/voice";

const ready = async (client) => {
  console.log(
    `Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`
  );

  client.user.setPresence({
    activities: [{ name: "you", type: "WATCHING" }],
    status: "online",
  });

  const channel = client.channels.cache.get("903388421811236885");

  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  initBot();
  initGuilds(client.guilds.cache);
};

export default ready;
