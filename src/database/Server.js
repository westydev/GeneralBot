const { Schema, model } = require("mongoose");

const Server = Schema({
  id: { type: String, unique: true, required: true },
  lang: { type: String, default: "tr_TR" },
  premium: Boolean,
  blacklist: Boolean
});

module.exports = model("Server", Server);