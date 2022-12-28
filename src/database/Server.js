const { Schema, model } = require("mongoose");

const Server = Schema({
  id: { type: String, unique: true, required: true },
  lang: { type: String, default: "tr_TR" },

  SwearGuard: { type: Boolean, default: false },
  AdversGuard: { type: Boolean, default: false },
  ChatGuardWhitelists: { type: Array, default: [] },
  SwearGuardProcess: { type: String, default: "REMOVE:MESSAGE" }, // REMOVE:MESSAGE | REMOVE:MESSAGE_TIMEOUT:USER | REMOVE:MESSAGE_BAN:USER
  AdversGuardProcess: { type: String, default: "REMOVE:MESSAGE" }, // REMOVE:MESSAGE | REMOVE:MESSAGE_TIMEOUT:USER | REMOVE:MESSAGE_BAN:USER
  BlacklistedWords: { type: Array, default: [] },
  CharacterLimit: { 
    CharacterLimitEnabled: Boolean,
    CharacterLimit: { type: Number, default: 100 }
  },
  RoleLog: {
    enabled: Boolean,
    channel: String
  },
  NewAccountBypass: {
    enabled: Boolean,
    channel: String,
    minDay: Number,
    role: String
  },
  VoiceLogSystem: {
    enabled: Boolean,
    channel: String
  },

  premium: Boolean,
  blacklist: Boolean,
});

module.exports = model("Server", Server);