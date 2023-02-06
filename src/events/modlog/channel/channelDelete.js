const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const { Modlog } = require("../../../database/Databases");

const client = global.client;
const logs = require("discord-logs");
logs(client);

client.on("channelDelete", async (channel, message) => {
    const GData = await Modlog.findOne({ id: channel.id });
    if(!GData) return
  const LogChannel = GData.ChannelLogs;
if (!LogChannel) return;
const channell = client.channels.cache.get(LogChannel);
if (!channell) return;
  const entry = await channel.guild.fetchAuditLogs({ type: AuditLogEvent.ChannelDelete }).then((audit) => audit.entries.first());
  let embed = new EmbedBuilder()
    .setAuthor({ name: channel.guild.name + ": Bir Kanal Silindi", iconURL: channel.guild.iconURL() })
    .setDescription( `**#${channel.name}**(\`${channel.id}\`) Adlı Kanal Silindi.\n\n Silen Kişi **<@${entry.executor.id}>** (\`${entry.executor.id}\`) \n\n Silinen Kanal Türü : **${channel.type}**` )
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
    .setColor("#E70000");
  return channell.send({ embeds: [embed] });
});
