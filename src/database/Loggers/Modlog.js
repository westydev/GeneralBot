const { Schema, model } = require("mongoose");

const Modlog = Schema({
  id: { type: String, required: true, unique: true },
  ChannelLogs: String,
  EmojiLogs: String,
  GuildMemberLogs: String,
  MessageLogs: String,
  RoleLogs: String
});

module.exports = model("Modlog", Modlog);
