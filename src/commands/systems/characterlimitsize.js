const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Server } = require("../../database/Databases")
const { guildSystemsEnabled } = require("../../helpers/Check/Check");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("characterlimitsize")
    .setDescription(`Karakter Limiti Koruma Sistemini Açar-Kapatır`)
    .addNumberOption((option) =>
      option
        .setName("size")
        .setDescription("Karakter Limiti")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, Lang) {
        const GuildConf = await guildSystemsEnabled(interaction.guild.id);

    try {
        const type = interaction.options.getNumber("size");
            await Server.findOneAndUpdate({ id: interaction.guild.id }, { CharacterLimit: { CharacterLimit: type, CharacterLimitEnabled: GuildConf.ChatGuard.CharacterLimit.CharacterLimitEnabled } });
            await interaction.reply({ content: `${Lang.commands.moderationCommands.swearguard.setTrue}`, ephemeral: true })
    } catch (error) {
        console.log(error);
    }
  },
};
