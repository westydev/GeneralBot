const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const { Modlog } = require("../../../database/Databases");

const client = global.client;
const logs = require("discord-logs");
logs(client);

client.on("emojiCreate", async function(emoji) {
  const GData = await Modlog.findOne({ id: emoji.guild.id });
  const LogChannel = GData.EmojiLogs;
if (!LogChannel) return;
const channel = client.channels.cache.get(LogChannel);
if (!channel) return;
  const entry = await emoji.guild.fetchAuditLogs({type: AuditLogEvent.EmojiCreate }).then(audit => audit.entries.first());
     let emojis = emoji;
     let embed = new EmbedBuilder()
    .setAuthor({ name: emoji.guild.name + ": Bir Emoji Eklendi", iconURL: emoji.guild.iconURL() })
    .setDescription(`Sunucuya Yeni Bir Emoji Eklendi => (${emoji}) \n\n Emojiyi Ekleyen Kişi : **<@${entry.executor.id}>**(\`${entry.executor.id}\`)`)
    .setColor("#E70000")
    .setThumbnail(entry.executor.avatarURL({dynamic:true}));
  return channel.send({ embeds: [embed] });

});