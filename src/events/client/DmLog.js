const { Events, EmbedBuilder, ChannelType } = require("discord.js")
const { BOTLOGS } = require("../../Settings/Config")

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.channel.type === ChannelType.DM) {
    const embed = new EmbedBuilder()
    .setTitle("Bota Mesaj Gönderildi")
    .addFields(
        {  name: `Mesaj Sahibi`, value: `${message.author.id}`  },
        {  name: `Tarih`, value: `${Date.now()}` }
    )
    .setDescription(`Mesaj: ${message.content}`)

    client.channels.cache.get(BOTLOGS.DmLogChannel).send({ embeds: [embed] })
    }
  },
};
