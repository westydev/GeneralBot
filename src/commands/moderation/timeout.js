const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Punishment } = require(`../../helpers/Moderation/Punish`); 

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute Command.")
    .setDefaultMemberPermissions()
    .addUserOption(option => option.setName('user').setDescription('User.').setRequired(true))
    .addNumberOption(option => option.setName('time').setDescription('Minute.').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason.').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers),
  async execute(interaction, Lang) {
    const member = interaction.options.getMember("user");
    const time = interaction.options.getNumber("time");
    const reason = interaction.options.getString("reason");

    const moderator = interaction.client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.user.id);

     const MuteMember = new Punishment({
       member: member,
       punishType: "mute",
       time: time * 1000 * 60,
       reason: reason,
       moderator: moderator,
       saveToDatabase: true,
     });
     
     await MuteMember.approval();
     await interaction.reply({ content: `${Lang.commands.moderationCommands.timeout.timeoutSucces}` });
  },
};