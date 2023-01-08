const { model , Schema} = require('mongoose');

module.exports = model("roleLog", Schema({ 
  guildID: String,
  memberID: String,
  roleID: String,
  type: String,
  entry: String,
  Date: { type: Date, default: Date.now }
}));