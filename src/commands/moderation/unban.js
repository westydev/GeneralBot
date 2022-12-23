const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')



module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Yasaklama Kaldırma Komutu.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(option => option.setName('user').setDescription('Unban User.').setRequired(true)),
  async execute (interaction, Lang) {
    const member = interaction.options.getString('user')

    var unBanLOG = new EmbedBuilder().addFields({
      name: `${Lang.commands.moderationCommands.unban.unbannedMember.replaceAll(
        "${member}",
        member
      )}`,
      value: `${Lang.commands.moderationCommands.unban.unbannedMemmberAuthor.replaceAll(
        "${interaction.user.tag}",
        interaction.user.tag
      )}`,
    });
    await interaction.reply({ embeds: [unBanLOG] })
    await interaction.guild.members.unban(member).catch(e => { interaction.reply({ content: e }) })
  }
}