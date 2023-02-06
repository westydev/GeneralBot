const { EmbedBuilder, AuditLogEvent, channelMention } = require("discord.js");
const { Modlog } = require("../../../database/Databases");

const client = global.client;
const logs = require("discord-logs");
logs(client);

client.on("guildChannelTopicUpdate",async (channel, oldTopic, newTopic) => {
    const GData = await Modlog.findOne({ id: channel.id });
    if(!GData) return
  const LogChannel = GData.ChannelLogs;
if (!LogChannel) return;
const channell = client.channels.cache.get(LogChannel);
if (!channell) return;
  let embed = new EmbedBuilder()
    .setColor("#E70000")
    .addFields(
         { name:"Kanal ", value: `${channelMention(channel.id)}`, inline: true},
        { name:"Eski Durum ", value: `\`\`\`${oldTopic}\`\`\``, inline: true},
        { name:"Yeni Durum ", value: `\`\`\`${newTopic}\`\`\``, inline: true}
    )
    .setFooter({text:client.user.username, iconURL:client.user.avatarURL()})
    .setDescription("⚒️ **Kanalda Durum Güncellemesi**")
    .setTimestamp();
   return channell.send({ embeds: [embed] });

});