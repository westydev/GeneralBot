const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Server } = require("../../database/Databases")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("blacklistedwordremove")
    .setDescription(`Karaliste Kelime Koruma Sistemi`)
    .addStringOption((option) =>
      option
        .setName("word")
        .setDescription("Kelime")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, Lang) {
    try {
        const type = interaction.options.getString("word");
            await Server.findOneAndUpdate({ id: interaction.guild.id }, { $pull: { BlacklistedWords: type } }, { upsert: true });
            await interaction.reply({ content: `${Lang.commands.moderationCommands.blacklistedword.removed}`, ephemeral: true })
    } catch (error) {
        console.log(error);
    }
  },
};
