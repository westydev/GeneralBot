const { EmbedBuilder, AuditLogEvent, channelMention } = require("discord.js");

const client = global.client;
const logs = require("discord-logs");
logs(client);
const { Modlog } = require("../../../database/Databases");

client.on("roleCreate",async function(role) {
    const GData = await Modlog.findOne({ id: role.guild.id });
    if(!GData) return
  const LogChannel = GData.RoleLogs;
if (!LogChannel) return;
const channel = client.channels.cache.get(LogChannel);
if (!channel) return;
const entry = await role.guild.fetchAuditLogs({ type: AuditLogEvent.RoleCreate }).then(audit => audit.entries.first());


  let embed = new EmbedBuilder()
    .setAuthor({ name: role.guild.name + ": Bir Rol Oluşturuldu!!", iconURL: role.guild.iconURL() })
    .setDescription(
      ` **${role.name}**(\`${role.id}\`) Adlı Rol Oluşturuldu!\n\n Oluşturan Kişi : <@${entry.executor.id}>(\`${entry.executor.id}\`)`
    )
    .setThumbnail (entry.executor.avatarURL({dynamic:true}))
    .setColor("#E70000");
  return channel.send({ embeds: [embed] });
});