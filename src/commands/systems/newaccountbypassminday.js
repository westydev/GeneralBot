const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Server } = require("../../database/Databases")
const { guildSystemsEnabled } = require("../../helpers/Check/Check");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("newaccountbypassminday")
    .setDescription(`Yeni Hesap Sistemini Açar-Kapatır`)
    .addNumberOption((option) =>
      option
        .setName("day")
        .setDescription("Gün")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, Lang) {
        const GuildConf = await guildSystemsEnabled(interaction.guild.id);

    try {
        const type = interaction.options.getNumber("day");
        await Server.findOneAndUpdate({ id: interaction.guild.id }, { NewAccountBypass: { channel: GuildConf.GuildGuard.NewAccountBypass.channel, enabled: GuildConf.GuildGuard.NewAccountBypass.enabled, minDay: type, role: GuildConf.GuildGuard.NewAccountBypass.role } });
        await interaction.reply({ content: `${Lang.commands.moderationCommands.swearguard.setTrue}`, ephemeral: true })
    } catch (error) {
        console.log(error);
    }
  },
};
