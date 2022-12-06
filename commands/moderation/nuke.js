const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('nuke')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDescription('Deletes the channel and creates a back copy.'),
  async execute (interaction) {
    interaction.channel.clone().then(knl => {
        let position = interaction.channel.position;
        knl.setPosition(position);
        interaction.channel.delete();
        let embed = new EmbedBuilder()
        .setDescription("Nuked This Channel.")
        .setImage('https://media1.giphy.com/media/oe33xf3B50fsc/giphy.gif')
        knl.send({ embeds: [embed] });
    });
  }
}