const Server = require("../../database/Server");

module.exports = {
  name: 'guildCreate',
  async execute (guild) {
     const Guild = await Server.findOne({ id: guild.id });
        if(!Guild) {
          const Sr = new Server({
            id: guild.id
          })
        await Sr.save()
        }
    }
}
