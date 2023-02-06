const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const { Modlog } = require("../../../database/Databases");

const client = global.client;
const logs = require("discord-logs");
logs(client);

client.on("emojiUpdate", async function(oldEmoji, newEmoji) {
  const GData = await Modlog.findOne({ id: oldEmoji.guild.id });
  if(!GData) return
  const LogChannel = GData.EmojiLogs;
if (!LogChannel) return;
const channel = client.channels.cache.get(LogChannel);
if (!channel) return;
  const entry = await oldEmoji.guild.fetchAuditLogs({type : AuditLogEvent.EmojiUpdate }).then(autdit => autdit.entries.first());
    let embed = new EmbedBuilder()
    .setAuthor({name: oldEmoji.guild.name + ": Emoji Güncellendi", iconURL: oldEmoji.guild.iconURL()})
    .setDescription(`Bir Emoji Güncellendi Güncellenen Emoji => **${newEmoji}**(\`${newEmoji.id}\`) \n\n Emojiyi Güncelleyen Kişi :** <@${entry.executor.id}>**(\`${entry.executor.id}\`)`)
    .setColor("#E70000")
  .setThumbnail(entry.executor.avatarURL({dynamic:true}));
  return channel.send({ embeds: [embed] });


});