import { initBot, initGuilds } from "../helpers";
import { joinVoiceChannel } from "@discordjs/voice";
import { ChannelType, Client } from "discord.js";

const ready = async (client: Client) => {
  console.log(
    `Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
  );

  client.user?.setPresence({
    activities: [{ name: "you", type: 3 }],
    status: "online",
  });

  const channel = client.channels.cache.get("903388421811236885");

  if (channel && channel.type === ChannelType.GuildVoice) {
    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
  }

  initBot();
  initGuilds(client.guilds.cache);
};

export default ready;
