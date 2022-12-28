const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Server } = require("../../database/Databases")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("swearguardprocess")
    .setDescription(`Küfür Koruma Sistemini Açar-Kapatır`)
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("İşlem")
        .setRequired(true)
        .addChoices(
         { name: `Mesajı Sil`, value: `deletemmesage` },
         { name: `Mesajı Sil ve Kullanıcıyı Sustur`, value: `deleteandmuteuser` },
         { name: `Mesajı Sil ve Kullanıcıyı Banla`, value: `dleteandbanuser` }
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, Lang) {
    try {
        const type = interaction.options.getString("type")
        if(type === `deletemmesage`) {
            await Server.findOneAndUpdate({ id: interaction.guild.id }, { SwearGuardProcess: "REMOVE:MESSAGE" });
            await interaction.reply({ content: `Değiştirildi.`, ephemeral: true })
        } else if(type === `deleteandmuteuser`) {
            await Server.findOneAndUpdate({ id: interaction.guild.id }, { SwearGuardProcess: "REMOVE:MESSAGE_TIMEOUT:USER" });
            await interaction.reply({ content: `Değiştirildi.`,  ephemeral: true })
        }else if(type === `dleteandbanuser`) {
            await Server.findOneAndUpdate({ id: interaction.guild.id }, { SwearGuardProcess: "REMOVE:MESSAGE_BAN:USER" });
            await interaction.reply({ content: `Değiştirildi.`,  ephemeral: true })
        }
    } catch (error) {
    }
  },
};
