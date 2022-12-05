const { SlashCommandBuilder } = require("discord.js");
const { error, info, success, warn } = require("../../src/helpers/Logger/Log")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("test."),
  async execute(interaction) {
   error('Error')
   info('Info')
   success('Succes')
   warn('Warn')
 }
}