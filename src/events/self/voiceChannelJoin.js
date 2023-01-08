const client = global.client
const logs = require('discord-logs');
logs(client);
const { guildSystemsEnabled } = require("../../helpers/Check/Check")


client.on("voiceChannelJoin", async (member, channel) => {
    try {
        const GuildConfigs = await guildSystemsEnabled(member.guild.id);
        const VoiceLog = GuildConfigs.Log.VoiceLogSystem;
        if (!VoiceLog.enabled) return;
        if (!VoiceLog.channel) return;

        var text = `> **__${member.user.tag}__** (${member.user.id}) Üyesi  **${channel.name}** Kanalına Katıldı.`;
        client.channels.cache.get(VoiceLog.channel).send({ content: text });
    } catch (error) {
        
    }
});