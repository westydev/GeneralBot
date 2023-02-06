const {
  EmbedBuilder,
  AuditLogEvent,
  channelMention,
  Events,
} = require("discord.js");

const client = global.client;
const logs = require("discord-logs");
logs(client);
const { Modlog } = require("../../../database/Databases");

client.on(Events.MessageDelete, async function (message) {
    const GData = await Modlog.findOne({ id: message.guild.id });
    if(!GData) return
  const LogChannel = GData.MessageLogs;
if (!LogChannel) return;
const channel = client.channels.cache.get(LogChannel);
if (!channel) return;
  let embed = new EmbedBuilder();

  if (message.partial) {
    embed

      .setAuthor({
       name: `${message.guild.name}: Bir Mesaj Silindi`,

       iconURL: message.guild.iconURL()
  })
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .setColor("#E70000")

      .setDescription(
        `Bir Mesaj Silindi. \n Silinen Kanal : <#${message.channel.id}>`
      );

  return channel.send({ embeds: [embed] });

  }

  embed

    .setAuthor({
     name: `${message.guild.name}: Bir Mesaj Silindi`,

    iconURL: message.guild.iconURL()
})

    .setColor("#E70000")
    .setDescription(
      `${message.author.username}(\`${message.author.id}\`) bir mesaj sildi.\n Sildiği Kanal : <#${message.channel.id}>`
    )
    .addFields(
        {name: "Bir Mesaj Silindi", value: message.content || "Bilgi Yok"}
        )
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
  return channel.send({ embeds: [embed] });

});
