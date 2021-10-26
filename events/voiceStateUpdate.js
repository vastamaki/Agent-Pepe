module.exports = (oldMember, newMember, client) => {
  if (!oldMember.channel && newMember.channel.name === "Platform 9 ¾") {
    newMember.member.voice.setChannel("692416528317939793");
  }
};
