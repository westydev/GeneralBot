const { Client, Collection, EmbedBuilder, PermissionOverwriteManager, SlashCommandBuilder } = require('discord.js')
const moment = require("moment")
moment.locale("tr")
const { RoleLog, Server } = require("../../database/Databases")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rollog')
    .setDescription('Kullanının Rollogunu Gösterir')
    .addUserOption(option => option.setName('üye').setDescription('Rollog User.').setRequired(true)),
  async execute (interaction) {
    const user = interaction.options.getUser('üye')
      const RLDATA = await RoleLog.find({ memberID: user.id, guildID: interaction.guild.id });
      const sr = await Server.findOne({ id: interaction.guild.id });
      if (!sr.RoleLog.enabled) return await interaction.reply({ content: `Rollog Sistemi Açık Değil` });
      if (!sr.RoleLog.channel) return await interaction.reply({ content: `Rollog Sistemi Açık Değil` });;
      let rol = RLDATA.sort((a, b) => b.Date - a.Date)
      let liste = rol.map(x => `${x.type == "Rol Verildi" ? "Verildi" : "Alındı" } Rol: <@&${x.roleID}> Yetkili: <@${x.entry}> Tarih: ${moment(x.Date).format("LLL")}`)
      let embed = new EmbedBuilder()
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
      .setDescription(`${liste.slice().join('\n')}`)
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.tag}  💖`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      await interaction.reply({ embeds: [embed], ephemeral: true })
  }
}