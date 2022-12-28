const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Server } = require("../../database/Databases")
const { guildSystemsEnabled } = require("../../helpers/Check/Check");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("voicelogchannel")
    .setDescription(`Karakter Limiti Koruma Sistemini Açar-Kapatır`)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Kanal")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, Lang) {
        const GuildConf = await guildSystemsEnabled(interaction.guild.id);

    try {
        const type = interaction.options.getChannel("channel");
        await Server.findOneAndUpdate({ id: interaction.guild.id }, { VoiceLogSystem: { channel: type.id, enabled: GuildConf.Log.VoiceLogSystem.enabled } });
        await interaction.reply({ content: `${Lang.commands.moderationCommands.swearguard.setTrue}`, ephemeral: true })
    } catch (error) {
        console.log(error);
    }
  },
};
