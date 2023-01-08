const Server = require("../../database/Server");
const { BOTLOGS } = require("../../Settings/Config");
const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
  name: 'guildCreate',
  async execute (guild) {
    try {
      const JoinChannel = client.channels.cache.get(BOTLOGS.GuildLog);
      if (!JoinChannel) return;

      const JoinEmbed = new EmbedBuilder()
        .setTitle(`Sunucuya Eklendim!`)
        .addFields(
          { name: `Sunucu İsmi`, value: `${guild.name}` },
          { name: `Sunucu ID`, value: `${guild.id}` },
          { name: `Sunucu Sahibi ID`, value: `<@${guild.ownerId}>` },
          { name: `Üye Sayısı`, value: `${guild.memberCount}` }
        )
        .setAuthor({
          name: guild.name,
          iconURL: guild.iconURL({ dynamic: true }),
        });
      JoinChannel.send({ embeds: [JoinEmbed] });

      const Guild = await Server.findOne({ id: guild.id });
      if (!Guild) {
        const Sr = new Server({
          id: guild.id,
        });
        await Sr.save();
      }
    } catch (error) {
      
    }
    }
}
