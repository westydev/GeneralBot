const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {

  data: new SlashCommandBuilder()
    .setName('banlist')
    .setDescription('Bans on the server.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute (interaction) {
    const fetchBans = interaction.guild.bans.fetch();

    const bannedMembers = (await fetchBans).map((member) => `> **__${member.user.tag}__**`+ " - " + `**${member.user.id}**`).join(`\n`)

    var embed = new EmbedBuilder()
    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
    .setDescription(bannedMembers)
    .setTimestamp()
      .setFooter({
        text: `${interaction.user.tag}  💖`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
    interaction.reply({ embeds: [embed] })
  }
}