const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')



module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Yasaklama Kaldırma Komutu.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(option => option.setName('user').setDescription('Unban User.').setRequired(true)),
  async execute (interaction) {
    const member = interaction.options.getString('user')

    var unBanLOG = new MessageEmbed()
    .addFields({name: `> **Yasağı Kaldırılan** **__${member}__**`, value: `> **Yasaklamayı Kaldıran**  **__${interaction.user.tag}__**` })
    await interaction.reply({ embeds: [unBanLOG] })
    await interaction.guild.members.unban(member).catch(e => { interaction.reply({ content: e }) })
  }
}