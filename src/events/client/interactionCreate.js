const { checkLanguage } = require("../../helpers/Check/Check")

module.exports = {
  name: 'interactionCreate',
  async execute (interaction) {
    const Lang = await checkLanguage({ guildID: interaction.guild.id });
    if (!interaction.isChatInputCommand()) return
    const command = await interaction.client.commands.get(interaction.commandName)
    if (!command) return
    try {
     await command.execute(interaction, Lang);
    } catch (error) {
      console.error(error)
      return await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
}
