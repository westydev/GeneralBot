const { error, info, success, warn } = require("../../helpers/Logger/Log")

module.exports = {
  name: 'ready',
  once: true,
  execute (client) {
      info(`Discord API Connected.`);
      client.user.setActivity("Kayıt olmayan kişileri gözlüyor...", "https://rapp");
  }
}
