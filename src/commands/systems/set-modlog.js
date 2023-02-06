const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, ChannelType, channelMention } = require("discord.js");
const { Modlog } = require("../../database/Databases")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-modlog")
    .setDescription(`Sunucu Modlog Kanalını Ayarlarsınız.`)
    .addChannelOption((option) =>
      option
        .setName("rolelog")
        .setDescription("Kanal")
        .addChannelTypes(ChannelType.GuildText)
    )
    .addChannelOption((option) =>
      option
        .setName("channellog")
        .setDescription("Kanal")
        .addChannelTypes(ChannelType.GuildText)
    )
    .addChannelOption((option) =>
      option
        .setName("emojilog")
        .setDescription("Kanal")
        .addChannelTypes(ChannelType.GuildText)
    )
    .addChannelOption((option) =>
      option
        .setName("guildlog")
        .setDescription("Kanal")
        .addChannelTypes(ChannelType.GuildText)
    )
    .addChannelOption((option) =>
      option
        .setName("messagelog")
        .setDescription("Kanal")
        .addChannelTypes(ChannelType.GuildText)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, Lang) {
    const rolelog = await interaction.options.getChannel(`rolelog`);
    const channellog = await interaction.options.getChannel(`channellog`);
    const emojilog = await interaction.options.getChannel(`emojilog`);
    const guildlog = await interaction.options.getChannel(`guildlog`);
    const messagelog = await interaction.options.getChannel(`messagelog`);
    await interaction.deferReply({ ephemeral: true })

    try {
        const gData = await Modlog.findOne({ id: interaction.guild.id });

        if(!gData) {
            const newG = new Modlog({
                id: interaction.guild.id
            })
            await newG.save()
        };
        const saveDatas = [];
        if (rolelog) {
          saveDatas.push({ option: "ChannelLogs", data: rolelog });
        }
        if (channellog) {
          saveDatas.push({ option: "EmojiLogs", data: channellog });
        }
        if (emojilog) {
          saveDatas.push({ option: "GuildMemberLogs", data: emojilog });
        }
        if (guildlog) {
          saveDatas.push({ option: "MessageLogs", data: guildlog });
        }
        if (messagelog) {
          saveDatas.push({ option: "RoleLogs", data: messagelog });
        }

        if(saveDatas.length == 0) return await interaction.editReply({ content: `En 1 Ayar Doldurmak Zorundasınız` })

        saveDatas.forEach(async x => {
         const d = x.option
          if (d == "ChannelLogs") {
            await Modlog.findOneAndUpdate(
              { id: interaction.guild.id },
              { ChannelLogs: channellog.id }
            );
          }
          if (d == "EmojiLogs") {
            await Modlog.findOneAndUpdate(
              { id: interaction.guild.id },
              { EmojiLogs: emojilog.id }
            );
          }
           if (d == "GuildMemberLogs") {
             await Modlog.findOneAndUpdate(
               { id: interaction.guild.id },
               { GuildMemberLogs: guildlog.id }
             );
           }
            if (d == "MessageLogs") {
              await Modlog.findOneAndUpdate(
                { id: interaction.guild.id },
                { MessageLogs: messagelog.id }
              );
            }
             if (d == "RoleLogs") {
               await Modlog.findOneAndUpdate(
                 { id: interaction.guild.id },
                 { RoleLogs: rolelog.id }
               );
             }
        });

        const newGData = await Modlog.findOne({ id: interaction.guild.id });

        const embed = new EmbedBuilder()
          .setTitle(`Güncel Ayarlar`)
          .setAuthor({
            name: interaction.guild.name,
            iconURL: interaction.guild.iconURL({ dynamic: true }),
          })
          .setTimestamp()
          .setFooter({
            text: `${interaction.user.tag}  💖`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
          .addFields(
            { name: `Kanal Log`, value: `${channelMention(newGData.ChannelLogs)}` },
            { name: `Emoji Log`, value: `${channelMention(newGData.EmojiLogs)}` },
            { name: `Guild Log`, value: `${channelMention(newGData.GuildMemberLogs)}` },
            { name: `Message Log`, value: `${channelMention(newGData.MessageLogs)}` },
            { name: `Role Log`, value: `${channelMention(newGData.RoleLogs)}` }
          );

          await interaction.editReply({ embeds: [embed] })
    } catch (error) {
    }
  },
};
