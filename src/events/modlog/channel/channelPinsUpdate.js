const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const { Modlog } = require("../../../database/Databases");

const client = global.client;
const logs = require("discord-logs");
logs(client);

client.on("channelPinsUpdate", async function(channel, time) {
  const GData = await Modlog.findOne({ id: channel.id });
  if(!GData) return

  const LogChannel = GData.ChannelLogs;
if (!LogChannel) return;
const channell = client.channels.cache.get(LogChannel);
if (!channell) return;
  const entry = await channel.guild.fetchAuditLogs({type: AuditLogEvent.MessagePin }).then(audit => audit.entries.first());

  let embed = new EmbedBuilder()
    .setAuthor({ name: channel.guild.name + ": Sabitlemelerde Değişiklik Yapıldı", iconURL: channel.guild.iconURL() })
    .setDescription(` **#${channel.name}**(\`${channel.id}\`) adlı kanal'da Sabitlemelerde Değişiklik Tespit Edildi.\n\n Yapan Kişi : <@${entry.executor.id}>(\`${entry.executor.id}\`) \n\n Yapılan Zaman : **${time}**`)
    .setThumbnail (entry.executor.avatarURL({dynamic:true}))
    .setColor("#E70000");
  return channell.send({ embeds: [embed] });

});