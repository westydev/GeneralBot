const { Events, EmbedBuilder, userMention } = require("discord.js");
const { JoinLogger } = require("../../database/Databases");

module.exports = {
  name: Events.GuildMemberRemove,
  async execute(member) {
    try {
      const Settings = await JoinLogger.findOne({ id: member.guild.id });
      if (Settings) {
        const enabled = Settings.enabled;
        const c = Settings.channel;
        if (enabled) {
          if (c) {
            const channel = client.channels.cache.get(c);
            if (channel) {
              const log = new EmbedBuilder()
                .setTitle(`Sunucudan Birisi Ayrıldı`)
                .setFooter({
                  text: `${member.user.tag}  💖`,
                  iconURL: member.user.displayAvatarURL({
                    dynamic: true,
                  }),
                })
                .setDescription(
                  `${userMention(
                    member.id
                  )} Sunucumuzdan Ayrıldı. Sunucumuz ${
                    member.guild.memberCount
                  } Kişi Oldu.`
                );
              channel.send({ embeds: [log] });
            }
          }
        }
      }
    } catch (error) {}
  },
};
