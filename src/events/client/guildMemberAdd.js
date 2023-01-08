const { Events, EmbedBuilder } = require("discord.js");
const { guildSystemsEnabled } = require("../../helpers/Check/Check")

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    try {
         const GuildConfigs = await guildSystemsEnabled(member.guild.id);

         const AccountBypass = GuildConfigs.GuildGuard.NewAccountBypass;

         if (!AccountBypass.enabled) return;
         if (!AccountBypass.channel) return;
         if (!AccountBypass.minDay) return;
         if (!AccountBypass.role) return;

         const user = member.user;
         const time = new Date().getTime() - user.createdAt.getTime();
         const logChannel = client.channels.cache.get(AccountBypass.channel);
         if (!logChannel) return;

         if (time < AccountBypass.minDay * 1000 * 86400) {
           const Embed = new EmbedBuilder()
             .setTitle("Yeni Hesap Algılandı")
             .setTimestamp()
             .setColor("Red")
             .addFields(
               { name: `Hesap`, value: `${member.id} - <@${member.id}>` },
               { name: `İşlem`, value: `Yeni Hesap Rolü Verildi.` }
             );
           await logChannel.send({ embeds: [Embed] });
           await member.roles.add(AccountBypass.role);
         }
    } catch (error) {
      
    }
  },
};
