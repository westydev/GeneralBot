const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Punishment } = require(`../../helpers/Moderation/Punish`) 

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban Command.")
    .setDefaultMemberPermissions()
    .addUserOption(option => option.setName('user').setDescription('User.').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason.').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction, Lang) {
    const member = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason");
    const moderator = interaction.client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.user.id);
     const BanMember = new Punishment({
       member: member,
       punishType: "ban",
       reason: reason,
       moderator: moderator,
       saveToDatabase: true,
     });
     await BanMember.approval();
      await interaction.reply({ content: `${Lang.commands.moderationCommands.ban.banSuccess}` });
  },
};