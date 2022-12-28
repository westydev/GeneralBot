const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Server } = require("../../database/Databases")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("blacklistedwords")
    .setDescription(`Karaliste Kelime Koruma Sistemi`)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction, Lang) {
    try {
      const sr = await Server.findOne({ id: interaction.guild.id });
      const WORDS = sr.BlacklistedWords;
      let word = WORDS.sort((a, b) => b.Date - a.Date)
      let liste = word.map(x => `${x}`)
       let embed = new EmbedBuilder()
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
      .setDescription(`${liste.slice().join('\n')}`)
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.tag}  💖`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      await interaction.reply({ embeds: [embed], ephemeral: true })
    } catch (error) {
        console.log(error);
    }
  },
};
