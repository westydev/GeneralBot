const { Schema, model } = require("mongoose");

const JoinLogger = Schema({
  id: { type: String, unique: true, required: true },
  enabled: { type: Boolean },
  channel: { type: String },
});

module.exports = model("JoinLogger", JoinLogger);
