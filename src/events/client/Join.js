const { Events, EmbedBuilder, userMention, roleMention } = require("discord.js");
const { JoinLogger, Otorole } = require("../../database/Databases");

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    try {
        const OtoroleSettings = await Otorole.findOne({ id: member.guild.id });
        if(OtoroleSettings) {
          const enabled = OtoroleSettings.enabled;
          const c = OtoroleSettings.channel;
          const r = OtoroleSettings.role;
          if(enabled) {
            if(c) {
              if(r) {
                const role = member.guild.roles.cache.get(r);
                const channel = member.guild.channels.cache.get(c);
                if(role) {
                  if(channel) {
                    member.roles.add(role);
                    const embed = new EmbedBuilder()
                    .setDescription(`${userMention(member.id)} Sunucuya Katıldı ve ${roleMention(role.id)} Rolü Verildi.`)
                  }
                }
              }
            }
          }
        }
        const Settings = await JoinLogger.findOne({ id: member.guild.id });
        if(Settings) {
            const enabled = Settings.enabled; 
            const c = Settings.channel;
            if(enabled) {
                if(c) {
                    const channel = client.channels.cache.get(c);
                    if(channel) {
                        const log = new EmbedBuilder()
                          .setTitle(`Sunucuya Yeni Birisi Giriş Yaptı`)
                          .setFooter({
                            text: `${member.user.tag}  💖`,
                            iconURL: member.user.displayAvatarURL({
                              dynamic: true,
                            }),
                          })
                          .setDescription(
                            `${userMention(
                              member.id
                            )} Sunucumuza Girdi. Onunla Birlikte Sunucumuz ${
                              member.guild.memberCount
                            } Kişi Oldu.`
                          );
                          channel.send({ embeds: [log] })
                    }
                }
            }
        }
    } catch (error) {
    }
  },
};
