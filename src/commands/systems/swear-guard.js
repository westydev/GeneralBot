const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Server } = require("../../database/Databases")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("swearguard")
    .setDescription(`Küfür Koruma Sistemini Açar-Kapatır`)
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("İşlem")
        .setRequired(true)
        .addChoices(
          { name: `Aç`, value: `ac` },
          { name: `Kapat`, value: `kapat` }
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, Lang) {
    try {
        const type = interaction.options.getString("type")
        if(type === `ac`) {
            await Server.findOneAndUpdate({ id: interaction.guild.id }, { SwearGuard: true });
            await interaction.reply({ content: `${Lang.commands.moderationCommands.swearguard.setTrue}`, ephemeral: true })
        } else if(type === `kapat`) {
            await Server.findOneAndUpdate({ id: interaction.guild.id }, { SwearGuard: false });
            await interaction.reply({ content: `${Lang.commands.moderationCommands.swearguard.setFalse}`,  ephemeral: true })
        }
    } catch (error) {
        console.log(error);
    }
  },
};
