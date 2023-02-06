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

client.on(Events.MessageBulkDelete, async function (messages) {
    const GData = await Modlog.findOne({ id: messages[0].guild.id });
    if(!GData) return
  const LogChannel = GData.MessageLogs;
if (!LogChannel) return;
const channel = client.channels.cache.get(LogChannel);
if (!channel) return;
  let embed = new EmbedBuilder();

  embed

    .setAuthor({
     name: `${messages[0].guild.name}: Çoklu Mesaj Silindi!`,

     iconURL: messages[0].guild.iconURL()
})

    .setColor("#E70000")

    .setDescription(
      `**${messages[0].author.username}**(\`${
        messages[0].author.id
      }\`) Adlı Kullanıcı **${
        messages.size
      }** adet Mesaj Sildi! ** \n\n Sildiği Kanal :<#${
        messages[0].channel.id
      }>**`
    );

  return channel.send({ embeds: [embed] });

});
