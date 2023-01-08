const { Schema, model } = require("mongoose");

const Otorole = Schema({
  id: { type: String, unique: true, required: true },
  enabled: { type: Boolean },
  channel: { type: String },
  role: { type: String },
});

module.exports = model("Otorole", Otorole);
