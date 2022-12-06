const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')



module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Deletes Messages in Chat.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addNumberOption(option => option.setName('number').setDescription('Silinicek Mesaj Sayısı.').setRequired(true)),
  async execute (interaction) {
    const amount = interaction.options.getNumber('number')

    try {
      interaction.channel.bulkDelete(amount).then(() => {
      let embed = new EmbedBuilder()
        .setDescription(`> **Başarıyla** **__${amount}__** **Mesaj Silindi !**`)
        .setColor("RANDOM");
      interaction.reply({ embeds: [embed] })    
  })
    } catch (error) {
      
    }
  }
}