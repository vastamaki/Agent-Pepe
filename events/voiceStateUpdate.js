const {
  getVoiceConnection,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");

const { join } = require("path");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const channels = [
  "903351306582896661",
  "903351329743847444",
  "903351356809678848",
  "903351379416997939",
  "903388421811236885",
];

const penthouseId = "692416528317939793";

module.exports = async (oldMember, newMember) => {
  const hasPenthouseAccess = oldMember.member.roles.cache.find(
    (role) => role.name === "Penthouse Access"
  );

  if (
    oldMember.channel?.name === "Lobby" &&
    newMember.channel?.name === "Elevator"
  ) {
    for (const i in channels) {
      try {
        newMember.member.voice.setChannel(channels[i]);
      } catch (err) {
        console.error(err);
      }
      await sleep(900);
    }

    if (hasPenthouseAccess) {
      const connection = getVoiceConnection(oldMember.guild.id);

      const player = createAudioPlayer();

      const accessGrantedSound = createAudioResource(
        join(__dirname, "granted.mp3")
      );

      const subscription = connection.subscribe(player);

      player.play(accessGrantedSound);

      if (subscription) {
        setTimeout(() => subscription.unsubscribe(), 5000);
      }

      await sleep(5000);

      newMember.member.voice.setChannel(penthouseId);
    } else {
      const connection = getVoiceConnection(oldMember.guild.id);

      const player = createAudioPlayer();

      const accessDeniedSound = createAudioResource(
        join(__dirname, "denied.mp3")
      );

      const subscription = connection.subscribe(player);

      player.play(accessDeniedSound);

      if (subscription) {
        setTimeout(() => subscription.unsubscribe(), 5000);
      }

      await sleep(3500);

      newMember.disconnect();
    }
  }
};
