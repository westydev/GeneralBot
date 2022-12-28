const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Server } = require("../../database/Databases")
const { guildSystemsEnabled } = require("../../helpers/Check/Check");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("newaccountbypasschannel")
    .setDescription(`Yeni Hesap Sistemini Açar-Kapatır`)
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
        await Server.findOneAndUpdate({ id: interaction.guild.id }, { NewAccountBypass: { channel: type.id, enabled: GuildConf.GuildGuard.NewAccountBypass.enabled, minDay: GuildConf.GuildGuard.NewAccountBypass.minDay, role: GuildConf.GuildGuard.NewAccountBypass.role } });
        await interaction.reply({ content: `${Lang.commands.moderationCommands.swearguard.setTrue}`, ephemeral: true })
    } catch (error) {
        console.log(error);
    }
  },
};
