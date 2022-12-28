const Server = require("../../database/Server");
const { BOTLOGS } = require("../../Settings/Config");
const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
  name: 'guildDelete',
  async execute (guild) {
    const QuitChannel = client.channels.cache.get(BOTLOGS.GuildLog);

    const QuitEmbed = new EmbedBuilder()
      .setTitle(`Sunucudan Atıldım!`)
      .addFields(
        { name: `Sunucu İsmi`, value: `${guild.name}` },
        { name: `Sunucu ID`, value: `${guild.id}` },
        { name: `Sunucu Sahibi ID`, value: `${guild.ownerId}` },
        { name: `Üye Sayısı`, value: `${guild.memberCount}` }
      )
      .setAuthor({
        name: guild.name,
        iconURL: guild.iconURL({ dynamic: true }),
      });
    QuitChannel.send({ embeds: [QuitEmbed] });
    }
}
