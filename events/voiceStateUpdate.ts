import {
  getVoiceConnection,
  createAudioPlayer,
  createAudioResource,
} from "@discordjs/voice";
import { ChannelType, PermissionFlagsBits, Role, VoiceState } from "discord.js";
import { join } from "path";
import { sleep } from "../helpers";
import { nanoid } from "nanoid";

const channels = [
  "903351306582896661",
  "903351329743847444",
  "903351356809678848",
  "903351379416997939",
  "903388421811236885",
];

const penthouseId = "692416528317939793";

const voiceStateUpdate = async (
  oldMember: VoiceState,
  newMember: VoiceState
) => {
  if (oldMember?.channel?.name === "Lobby") {
    const elevatorAccessRole = newMember.guild.roles.cache.find(
      (role) => role.name === "Elevator Access"
    );
    await newMember.member.roles.remove(elevatorAccessRole);
  }
  if (newMember?.channel?.name === "Lobby") {
    const elevatorAccessRole = newMember.guild.roles.cache.find(
      (role) => role.name === "Elevator Access"
    );
    await newMember.member.roles.add(elevatorAccessRole);
  }
  if (oldMember?.channel?.name.endsWith("tmp") && !newMember.channel) {
    const connectedUsers = oldMember.channel.members;
    if (!connectedUsers.lastKey()) {
      await oldMember.channel.delete();
    }
  }
  if (
    newMember.channel?.name === "Authorized persons only" &&
    newMember.member.roles.cache.some((role) => role.name === "Authorized")
  ) {
    const existingVoice = newMember.guild.channels.cache.find(
      (channel) =>
        channel.type === ChannelType.GuildVoice && channel?.name.endsWith("tmp")
    );
    if (existingVoice) {
      newMember.setChannel(existingVoice.id);
      return;
    }
    const newChannel = await newMember.guild?.channels.create({
      name: nanoid() + "tmp",
      type: ChannelType.GuildVoice,
      reason: "Needed a new channel",
      parent: newMember.channel.parentId,
      permissionOverwrites: [
        {
          id: newMember.guild.roles.everyone,
          deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.Connect],
        },
        {
          id: newMember.guild.roles.cache.find(
            (role) => role.name === "Authorized"
          ),
          allow: [
            PermissionFlagsBits.MoveMembers
          ],
        },
      ],
    });

    await newMember.setChannel(newChannel);
  }
  if (
    oldMember.channel?.name === "Lobby" &&
    newMember.channel?.name === "Elevator"
  ) {
    const hasPenthouseAccess = oldMember.member?.roles.cache.find(
      (role: Role) => role.name === "Penthouse Access"
    );
    for (const i in channels) {
      try {
        await newMember.member?.voice.setChannel(channels[i]);
      } catch (err) {
        console.error(err);
      }
      await sleep(900);
    }

    const connection = getVoiceConnection(oldMember.guild.id);

    if (!connection) return;

    const player = createAudioPlayer();

    const subscription = connection.subscribe(player);

    if (hasPenthouseAccess) {
      const accessGrantedSound = createAudioResource(
        join(process.cwd(), "/events/", "granted.mp3")
      );

      player.play(accessGrantedSound);

      if (subscription) {
        setTimeout(() => subscription.unsubscribe(), 4000);
      }

      await sleep(4000);

      newMember.member?.voice.setChannel(penthouseId);
    } else {
      const accessDeniedSound = createAudioResource(
        join(process.cwd(), "/events/", "denied.mp3")
      );

      player.play(accessDeniedSound);

      if (subscription) {
        setTimeout(() => subscription.unsubscribe(), 2000);
      }

      await sleep(2000);

      newMember.disconnect();
    }
  }
};

export default voiceStateUpdate;
