module.exports = {
  name: 'interactionCreate',
  async execute (interaction) {

    if (!interaction.isChatInputCommand()) return
    const command = await interaction.client.commands.get(interaction.commandName)
    if (!command) return
    try {
     await command.execute(interaction);
    } catch (error) {
      console.error(error)
      return await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
}
