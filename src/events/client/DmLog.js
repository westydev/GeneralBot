const { Events, EmbedBuilder, ChannelType } = require("discord.js")
const { BOTLOGS } = require("../../Settings/Config")

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    try {
         if (message.channel.type === ChannelType.DM) {
           const channel = client.channels.cache.get(BOTLOGS.DmLogChannel);
           if (!channel) return;
           const embed = new EmbedBuilder()
             .setTitle("Bota Mesaj Gönderildi")
             .addFields(
               { name: `Mesaj Sahibi`, value: `${message.author.id}` },
               { name: `Tarih`, value: `${Date.now()}` }
             )
             .setDescription(`Mesaj: ${message.content}`);

           channel.send({ embeds: [embed] });
         }
    } catch (error) {
      
    }
  },
};
