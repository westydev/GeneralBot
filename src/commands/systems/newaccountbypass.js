const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Server } = require("../../database/Databases")
const { guildSystemsEnabled } = require('../../helpers/Check/Check')
module.exports = {
  data: new SlashCommandBuilder()
    .setName("newaccountbypass")
    .setDescription(`Yeni Hesap Sistemini Açar-Kapatır`)
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
    const GuildConf = await guildSystemsEnabled(interaction.guild.id);
    try {
        const type = interaction.options.getString("type")
        if(type === `ac`) {
            await Server.findOneAndUpdate({ id: interaction.guild.id }, { NewAccountBypass: { enabled: true, channel: GuildConf.GuildGuard.NewAccountBypass.channel, minDay: GuildConf.GuildGuard.NewAccountBypass.minDay, role: GuildConf.GuildGuard.NewAccountBypass.role } });
            await interaction.reply({ content: `${Lang.commands.moderationCommands.swearguard.setTrue}`, ephemeral: true })
        } else if(type === `kapat`) {
            await Server.findOneAndUpdate({ id: interaction.guild.id }, { NewAccountBypass: { enabled: false, channel: GuildConf.GuildGuard.NewAccountBypass.channel, minDay: GuildConf.GuildGuard.NewAccountBypass.minDay, role: GuildConf.GuildGuard.NewAccountBypass.role } });
            await interaction.reply({ content: `${Lang.commands.moderationCommands.swearguard.setFalse}`,  ephemeral: true })
        }
    } catch (error) {
        console.log(error);
    }
  },
};
