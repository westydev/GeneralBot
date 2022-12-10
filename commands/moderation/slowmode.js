const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Sets Channel Timeout.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addStringOption(option => option.setName('number').setDescription('Slowmode Time').setRequired(true)),
  async execute (interaction, Lang) {
    const time = interaction.options.getString('number')
    if (time > 1000) return interaction.reply(Lang.commands.moderationCommands.slowmode.slowModeMaxTimeError)
    if (isNaN(time)) return interaction.reply(Lang.commands.moderationCommands.slowmode.slowModeIsNan);
    interaction.channel.setRateLimitPerUser(time, "Kanal Zamanasimi");
    interaction.reply(
      (Lang.commands.moderationCommands.slowmode.slowModeSucces).replaceAll("${time}",time)
    );
  }
}