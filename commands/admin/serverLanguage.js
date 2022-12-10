const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits  } = require('discord.js');
const Server = require("../../src/database/Server")

module.exports = {
    data: new SlashCommandBuilder()
      .setName('serverlang')
	   .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .setDescription('Set server language.'),
        async execute (interaction) {
		
            const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('select_lang')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Turkish',
							description: 'Sunucu Dili Türkçe Yaparsınız.',
							value: 'lang_turkish',
						},
						{
							label: 'English',
							description: 'You Make the Server Language English.',
							value: 'lang_english',
						},
					]),
			);
        await interaction.reply({ components: [row], ephemeral: true });


		interaction.client.on("interactionCreate",  async interaction => {

			if (interaction.isStringSelectMenu()) {
				if(interaction.customId === 'select_lang') {
					if(interaction.values == "lang_turkish") {
						await Server.findOneAndUpdate({ id: interaction.guild.id }, { lang: 'tr_TR' });
						interaction.reply({ content: "Dil Türkçe Olarak Ayarlandı", ephemeral: true })
					}
					if(interaction.values == "lang_english") {
						await Server.findOneAndUpdate({ id: interaction.guild.id }, { lang: 'en_EN' });
						interaction.reply({ content: "Language Set to English.",  ephemeral: true })
					}
				}
			}
		})
    }
  }