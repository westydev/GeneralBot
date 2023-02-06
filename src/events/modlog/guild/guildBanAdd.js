const { EmbedBuilder, AuditLogEvent, channelMention, Events } = require("discord.js");
const { Modlog } = require("../../../database/Databases");

const client = global.client;
const logs = require("discord-logs");
logs(client);

client.on("guildBanAdd", async(guild, user) => {
    const GData = await Modlog.findOne({ id: guild.id });
  const LogChannel = GData.GuildMemberLogs;
if (!LogChannel) return;
const channel = client.channels.cache.get(LogChannel);
if (!channel) return;
    const entry = await guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanAdd }).then(audit => audit.entries.first());
     let embed = new EmbedBuilder()
  .setDescription(
    `**${user.username}**(\`${user.id}\`) Adlı Kullanıcı Sunucudan Banlandi\n\n Banlayan Kişi **<@${entry.executor.id}>**(\`${entry.executor.id}\`)`
  )
  .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
  .setColor("#E70000")
  .setTimestamp();
  return channel.send({ embeds: [embed] });
})