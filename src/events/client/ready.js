const { error, info, success, warn } = require("../../helpers/Logger/Log")
const { BOT } = require("../../Settings/Config");
const Server = require("../../database/Server");


module.exports = {
  name: 'ready',
  once: true,
 async execute (client) {
      info(`Discord API Connected.`);
      client.user.setActivity(BOT.botActivity);
      client.guilds.cache.forEach(async guild => {
        const Guild = await Server.findOne({ id: guild.id });
        if(!Guild) {
          const Sr = new Server({
            id: guild.id
          });
        await Sr.save()
        }
      });      
  }
}
