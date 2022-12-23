const { SlashCommandBuilder } = require("discord.js")
 
module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription(`Shows User's Avatar`)
    .addUserOption(option => option.setName('user').setDescription('User to Show Avatar')),
  async execute (interaction) {
    const user = interaction.options.getUser('user')

    if(user) {
        await interaction.reply({ content: user.displayAvatarURL({dynamic:true}), ephemeral: true })
    }
    if(!user) {
        await interaction.reply({ content: interaction.user.displayAvatarURL({dynamic:true}), ephemeral: true })
    }
 }
}
