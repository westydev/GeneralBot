const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
 
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription(`Shows Bot's Ping`),
   async execute (interaction) {
   await interaction.deferReply();

   const cmdCreated = Date.now();
   const ping = client.ws.ping;

   var status = ":badVds:";

   if (ping >= 60) status = ":ehVds:";
   if (ping >= 120) status = ":badVds:";
   if (ping <= 30) status = ":goodVds:";

   return interaction.followUp({
     embeds: [
       new EmbedBuilder()
         .setColor("#36393F")
         .setAuthor({
           name: interaction.user.tag,
           iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
         })
         .setDescription(
           status + " **|** Ping pong, gecikme sürelerim aşağıda yer alıyor."
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