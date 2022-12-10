const { Schema, model } = require("mongoose");

const Punish = Schema ({
  guildID: String,
  memberID: String, 
  moderatorID: String,
  punishType: String, 
  reason: { type: String, default: "--" },
  time: { type: Number, default: null },
  date: Date,
});

module.exports = model("Punish", Punish);