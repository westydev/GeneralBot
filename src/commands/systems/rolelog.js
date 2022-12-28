const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Server } = require("../../database/Databases")
const { guildSystemsEnabled } = require('../../helpers/Check/Check')
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rolelog")
    .setDescription(`RoleLog Sistemini Açar-Kapatır`)
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
            await Server.findOneAndUpdate({ id: interaction.guild.id }, { RoleLog: { enabled: true, channel: GuildConf.Log.RoleLog.channel } });
            await interaction.reply({ content: `${Lang.commands.moderationCommands.swearguard.setTrue}`, ephemeral: true })
        } else if(type === `kapat`) {
            await Server.findOneAndUpdate({ id: interaction.guild.id }, { RoleLog: { enabled: false, channel: GuildConf.Log.RoleLog.channel } });
            await interaction.reply({ content: `${Lang.commands.moderationCommands.swearguard.setFalse}`,  ephemeral: true })
        }
    } catch (error) {
        console.log(error);
    }
  },
};
