const { Events, ChannelType } = require("discord.js")
const { allCheck, BlacklistedWord } = require("../../helpers/Check/WordCheck");
const { checkUserForDatabase, guildSystemsEnabled } = require("../../helpers/Check/Check");
const { User } = require("../../database/Databases");
const { Punish } = require("../../helpers/Moderation/Punish");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.channel.type === ChannelType.DM) return;
    const WordResults = await allCheck(message.content);

    await checkUserForDatabase(message.author.id);

    if(WordResults.Toxicity > 0) {
      await User.findOneAndUpdate({ id: message.author.id }, { $inc: { Toxicity: WordResults.Toxicity} }, { upsert: true });
    };
    const GuildConfigs = await guildSystemsEnabled(message.guild.id);

    if (GuildConfigs.ChatGuard.Whitelists.some((a) => message.author.id === a)) return;
    if (message.author.id === client.user.id) return;
    if (message.author.id === message.guild.ownerId) return;

    const SwearGuardProcess = GuildConfigs.ChatGuard.SwearGuardProcess;
    const AdversGuardProcess = GuildConfigs.ChatGuard.AdversGuardProcess;

    if(GuildConfigs.ChatGuard.SwearGuard) {
      if(WordResults.SwearEnabled) {
        if (SwearGuardProcess === "REMOVE:MESSAGE") {
          if (message && message.deletable) message.delete({ timeout: 0120 }).catch(() => {});
        }
        if (SwearGuardProcess === "REMOVE:MESSAGE_TIMEOUT:USER") {
          if (message && message.deletable) message.delete({ timeout: 0120 }).catch(() => {});
          const UserPunishProcess = new Punish({
            member: message.member,
            moderator: client.user,
            punishType: "mute",
            reason: "Swear Automatic",
            saveToDatabase: true,
            time: 3600 * 1000,
          });
         await UserPunishProcess.approval();
        }
        if (SwearGuardProcess === "REMOVE:MESSAGE_BAN:USER") {
          if (message && message.deletable) message.delete({ timeout: 0120 }).catch(() => {});
          const UserPunishProcess = new Punish({
            member: message.member,
            moderator: client.user,
            punishType: "ban",
            reason: "Swear Automatic",
            saveToDatabase: true,
          });
          await UserPunishProcess.approval();
        }
      }
    }

    if(GuildConfigs.ChatGuard.AdversGuard) {
      if(WordResults.LinkEnabled || WordResults.InviteEnabled) {
        if (AdversGuardProcess === "REMOVE:MESSAGE") {
          if (message && message.deletable) message.delete({ timeout: 0120 }).catch(() => {});
        }
        if (AdversGuardProcess === "REMOVE:MESSAGE_TIMEOUT:USER") {
          if (message && message.deletable) message.delete({ timeout: 0120 }).catch(() => {});
          const UserPunishProcess = new Punish({
            member: message.member,
            moderator: client.user,
            punishType: "mute",
            reason: "Adversting Automatic",
            saveToDatabase: true,
            time: 3600 * 1000,
          });
          await UserPunishProcess.approval();
        }
        if (AdversGuardProcess === "REMOVE:MESSAGE_BAN:USER") {
          if (message && message.deletable) message.delete({ timeout: 0120 }).catch(() => {});
          const UserPunishProcess = new Punish({
            member: message.member,
            moderator: client.user,
            punishType: "ban",
            reason: "Adversting Automatic",
            saveToDatabase: true,
          });
          await UserPunishProcess.approval();
        }
      }
    }

    const BlacklistedWordEnabled = await BlacklistedWord(message.content, message.guild.id);

    if(BlacklistedWordEnabled == true) {
      if (message && message.deletable) message.delete({ timeout: 0120 }).catch(() => {});
      const UserPunishProcess = new Punish({
        member: message.member,
        moderator: client.user,
        punishType: "mute",
        reason: "Blacklisted Word Automatic",
        saveToDatabase: true,
        time: 3600 * 1000,
      });
      await UserPunishProcess.approval();
    }

    if(GuildConfigs.ChatGuard.CharacterLimit.CharacterLimitEnabled) {
      if(message.content.length  > GuildConfigs.ChatGuard.CharacterLimit.CharacterLimit) {
        if (message && message.deletable)
          message.delete({ timeout: 0120 }).catch(() => {});
        const UserPunishProcess = new Punish({
          member: message.member,
          moderator: client.user,
          punishType: "mute",
          reason: "CharacterLimit Automatic",
          saveToDatabase: true,
          time: 3600 * 1000,
        });
        await UserPunishProcess.approval();
      }
    }


    
  }
};
