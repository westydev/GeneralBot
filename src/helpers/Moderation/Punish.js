const { ModerationCore } = require("./ModerationCore")
const PunishData = require("../database/Schemas/PunishData")

class Punish {
    constructor({ punishType, member, time, reason, saveToDatabase, moderator }) {
        this.punishType = punishType;
        this.member = member;
        this.time = time;
        this.saveToDatabase = saveToDatabase;
        this.reason = reason;
        this.moderator = moderator;
    }

    async approval() {
        try {
            switch (this.punishType) {
                case "ban":
                    const Ban = new ModerationCore({ member: this.member })
                    Ban.ban()
                    if (this.saveToDatabase === true) {
                        const BanData = new PunishData({
                          guildID: this.member.guild.id,
                          memberID: this.member.id,
                          moderatorID: this.moderator.id,
                          punishType: this.punishType,
                          reason: this.reason,
                          time: this.time / 60000,
                          date: Date.now(),
                        });
                        BanData.save()
                    }
                    break;
                case "kick":
                    const Kick = new ModerationCore({ member: this.member });
                    Kick.kick()
                    if (this.saveToDatabase === true) {
                        const KickData = new PunishData({
                          guildID: this.member.guild.id,
                          memberID: this.member.id,
                          moderatorID: this.moderator.id,
                          punishType: this.punishType,
                          reason: this.reason,
                          time: this.time / 60000,
                          date: Date.now(),
                        });
                        KickData.save()
                    }
                    break;
                case "mute":
                    const Mute = new ModerationCore({ member: this.member });
                    Mute.mute(this.time)
                    if (this.saveToDatabase === true) {
                        const MuteData = new PunishData({
                          guildID: this.member.guild.id,
                          memberID: this.member.id,
                          moderatorID: this.moderator.id,
                          punishType: this.punishType,
                          reason: this.reason,
                          time: this.time / 60000,
                          date: Date.now(),
                        });
                        MuteData.save()
                    }
                    break;         
                default:
                    break;
            }
        } catch (error) {
           console.log(error);
        }
    }
}

module.exports = { Punish }