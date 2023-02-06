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

client.on(Events.MessageUpdate, async function (oldMessage, newMessage) {
    const GData = await Modlog.findOne({ id: message.guild.id });
      const LogChannel = GData.MessageLogs;
if (!LogChannel) return;
const channel = client.channels.cache.get(LogChannel);
if (!channel) return;
  let main = await oldMessage.fetch();

  if (oldMessage.content === newMessage.content) return;

  let message = newMessage;

  let embed = new EmbedBuilder();

  embed
    .addFields(
      { name: "Eski Mesajı", value: `\`${oldMessage.content}\`` },
      { name: "Yeni Mesajı", value: `\`${newMessage.content}\`` }
    )

    .setAuthor({
     name: `${message.guild.name}: Mesaj Düzenlendi`,
    iconURL: message.guild.iconURL()
})
    .setColor("#E70000")
    .setThumbnail(oldMessage.author.avatarURL({ dynamic: true }))
    .setDescription(
      `<#${message.channel.id}> Adlı Kanal'da Bir Mesaj Düzenlendi.\n Düzenleyen : **${main.author}**\n Düzenlenen Mesaj İçin: [TIKLA](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`
    );

   return channel.send({ embeds: [embed] });

});