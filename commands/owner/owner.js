const { SlashCommandBuilder } = require("discord.js")
const { checkOwner } = require("../../src/helpers/Check/Check")
const { clearCache } = require("../../src/helpers/DiscordAPI/Cache");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('owner')
    .setDescription(`Owner Panel.`)
    .addStringOption(option => option.setName('type').setDescription('System.').addChoices(
        { name: "Optimize", value: "optimize" }
    )),
  async execute (interaction) {

    try {
        const type = await interaction.options.getString("type");
        const ownerEnabled = checkOwner(interaction.user.id);

        if (ownerEnabled === true) {
          switch (type) {
            case "optimize":
              clearCache(interaction.client);
              await interaction.reply({
                content: `İşlem Başarılı.`,
                ephemeral: true,
              });
              break;
          }
        }
    } catch (error) {
        
    }
 }
}
