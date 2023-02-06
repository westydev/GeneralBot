const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const { Modlog } = require("../../../database/Databases");

const client = global.client;
const logs = require("discord-logs");
logs(client);

client.on("emojiDelete", async function(emoji) {
  const GData = await Modlog.findOne({ id: emoji.guild.id });
  if(!GData) return
  const LogChannel = GData.EmojiLogs;
if (!LogChannel) return;
const channel = client.channels.cache.get(LogChannel);
if (!channel) return;
  const entry = await emoji.guild.fetchAuditLogs({type:AuditLogEvent.EmojiDelete}).then(audit => audit.entries.first());
  let emojise = emoji;

  let embed = new EmbedBuilder()

    .setAuthor({name: emoji.guild.name + ":Bir Emoji Silindi", iconURL: emoji.guild.iconURL()})

    .setDescription(`**${emoji.name}** (\`${emoji.id}\`) Adlı Emoji Sunucudan Silindi.\n\n Silen Kişi : **<@${entry.executor.id}> ** (\`${entry.executor.id}\`)`)

    .setColor("#E70000")

  . setThumbnail (entry.executor.avatarURL({dynamic:true}));
  return channel.send({ embeds: [embed] });


});