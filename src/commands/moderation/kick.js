const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Punishment } = require(`../../helpers/Moderation/Punish`); 

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick Command.")
    .setDefaultMemberPermissions()
    .addUserOption(option => option.setName('user').setDescription('User.').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason.').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction, Lang) {
    const member = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason");
    const moderator = interaction.client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.user.id);
     const KickMember = new Punishment({
       member: member,
       punishType: "kick",
       reason: reason,
       moderator: moderator,
       saveToDatabase: true,
     });
      await KickMember.approval();
      await interaction.reply({ content: `${Lang.commands.moderationCommands.kick.kickSuccess}` });
  },
};