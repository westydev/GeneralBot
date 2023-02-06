const { EmbedBuilder, AuditLogEvent, channelMention, Events } = require("discord.js");

const client = global.client;
const logs = require("discord-logs");
logs(client);
const { Modlog } = require("../../../database/Databases");

client.on("roleDelete", async function(role) {
    const GData = await Modlog.findOne({ id: role.guild.id });
    const LogChannel = GData.RoleLogs;
if (!LogChannel) return;
const channel = client.channels.cache.get(LogChannel);
if (!channel) return;
const entry = await role.guild.fetchAuditLogs({ type: AuditLogEvent.RoleDelete }).then(audit => audit.entries.first());
  let embed = new EmbedBuilder()
    .setAuthor({ name: role.guild.name + ": Bir Rol Silindi!",iconURL: role.guild.iconURL() })
    .setDescription(`**${role.name}**(\`${role.id}\`) Adlı Rol Silindi!\n\n Silen Kişi : <@${entry.executor.id}>(\`${entry.executor.id}\`)`)
    .setThumbnail (entry.executor.avatarURL({dynamic:true}))
    .setColor("#E70000");
  return channel.send({ embeds: [embed] });
});