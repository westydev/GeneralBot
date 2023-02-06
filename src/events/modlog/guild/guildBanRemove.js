const {
  EmbedBuilder,
  AuditLogEvent,
  channelMention,
  Events,
} = require("discord.js");
const { Modlog } = require("../../../database/Databases");

const client = global.client;
const logs = require("discord-logs");
logs(client);

client.on("guildBanRemove", async (guild, user, message) => {
    const GData = await Modlog.findOne({ id: guild.id });
  const LogChannel = GData.GuildMemberLogs;
if (!LogChannel) return;
const channel = client.channels.cache.get(LogChannel);
if (!channel) return;
  const entry = await guild
    .fetchAuditLogs({ type: AuditLogEvent.MemberBanRemove })
    .then((audit) => audit.entries.first());

  let embed = new EmbedBuilder()
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
    .setDescription(
      `**${user.username}**(\`${user.id}\`) Adlı Kullanıcının Banı Açıldı.\n\n Banını Açan Kişi : **<@${entry.executor.id}>**(\`${entry.executor.id}\`)`
    )
    .setColor("#E70000")
    .setTimestamp();
  return channel.send({ embeds: [embed] });

});