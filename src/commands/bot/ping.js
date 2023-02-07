const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
 
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription(`Shows Bot's Ping`),
   async execute (interaction) {
   await interaction.deferReply();

   const cmdCreated = Date.now();
   const ping = client.ws.ping;

   return interaction.followUp({
     embeds: [
       new EmbedBuilder()
         .setColor("#36393F")
         .setAuthor({
           name: interaction.user.tag,
           iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
         })
         .setDescription(
            " **|** Ping pong, gecikme sürelerim aşağıda yer alıyor."
         )
         .addFields(
           {
             name: "Gecikme:",
             value: "```css\n" + ping + "ms\n```",
             inline: true,
           },
           {
             name: "Etikleşim gecikmesi:",
             value: "```css\n" + (Date.now() - cmdCreated) + "ms\n```",
             inline: true,
           }
         ),
     ],
     fetchReply: true,
   });
 }
}
