const { Schema, model } = require("mongoose");

const User = Schema({
  id: { type: String, unique: true, required: true },
  Toxicity: { type: Number, default: 0 }
});

module.exports = model("User", User);