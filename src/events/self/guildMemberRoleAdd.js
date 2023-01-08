const client = global.client
const logs = require('discord-logs');
logs(client);
const { guildSystemsEnabled } = require("../../helpers/Check/Check")
const { EmbedBuilder, AuditLogEvent } = require('discord.js')
const { RoleLog } = require("../../database/Databases")

client.on("guildMemberRoleAdd", async (member, role) => {
  try {
    const GuildConfs = await guildSystemsEnabled(member.guild.id);

    console.log(GuildConfs);

    if (!GuildConfs.Log.RoleLog.enabled) return;
    if (!GuildConfs.Log.RoleLog.channel) return;

    const entry = await member.guild.fetchAuditLogs({ type: AuditLogEvent.MemberRoleUpdate }).then(logs => logs.entries.first());
    const id = entry.executor.id;
    let memberentry = client.users.cache.get(id)
    if (!role.guild) return;
    if(memberentry.bot == true) return;
    var embed = new EmbedBuilder()
    .setAuthor({ name: member.user.tag, iconURL: member.displayAvatarURL({dynamic:true}) })
        .addFields(
          { name: "**Rol Verilen üye**", value: `<@${member.user.id}> - **${member.user.id}**` },
          { name: `- **Veren Yetkili**`, value: `<@${id}> - **${id}**`},
          { name: `- **Verilen Rol**`, value: `<@&${role.id}> - **${role.id}**` }
          )
    .setFooter({ text: `${member.user.tag}`, iconURL: member.displayAvatarURL({dynamic:true}) })
    .setTimestamp()

    client.channels.cache.get(GuildConfs.Log.RoleLog.channel).send({ embeds: [embed] })  

     var roleLogData = new RoleLog({
       guildID: member.guild.id,
       memberID: member.id,
       roleID: role.id,
       entry: id,
       type: "Rol Verildi",
     });
     roleLogData.save()
  } catch (error) {
    
  }
  });
