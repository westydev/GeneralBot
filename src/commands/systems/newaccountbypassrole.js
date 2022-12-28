const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Server } = require("../../database/Databases")
const { guildSystemsEnabled } = require("../../helpers/Check/Check");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("newaccountbypassrole")
    .setDescription(`Yeni Hesap Sistemini Açar-Kapatır`)
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Kanal")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, Lang) {
        const GuildConf = await guildSystemsEnabled(interaction.guild.id);

    try {
        const type = interaction.options.getRole("role");
        await Server.findOneAndUpdate({ id: interaction.guild.id }, { NewAccountBypass: { channel: GuildConf.GuildGuard.NewAccountBypass.channel, enabled: GuildConf.GuildGuard.NewAccountBypass.enabled, minDay: GuildConf.GuildGuard.NewAccountBypass.minDay, role: type.id } });
        await interaction.reply({ content: `${Lang.commands.moderationCommands.swearguard.setTrue}`, ephemeral: true })
    } catch (error) {
        console.log(error);
    }
  },
};
