const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Sets Channel Timeout.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addStringOption(option => option.setName('number').setDescription('Slowmode Time').setRequired(true)),
  async execute (interaction) {

    const time = interaction.options.getString('number')
    if (time > 1000) return interaction.reply("Yavaş mod en fazla 1000 olabilir.")
    if (isNaN(time)) return interaction.reply(`Bu bir sayı değil!`);
    interaction.channel.setRateLimitPerUser(time, "Kanal Zamanasimi");
    interaction.reply(
    `Artık bu kanala **${time}** saniyede bir mesaj yazılabilecek.`
  );
  }
}