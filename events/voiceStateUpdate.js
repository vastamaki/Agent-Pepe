const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const channels = [
  "903351306582896661",
  "903351329743847444",
  "903351356809678848",
  "903351379416997939",
  "903351398710788166",
  "903351429400498207",
  "903351457825292308",
  "903351479690199050",
  "903351506558914570",
  "692416528317939793",
];

module.exports = async (oldMember, newMember, client) => {
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
  }
};
