const { BOT, DATABASE } = require("./Settings/Config")
const { OAuth2Scopes, Client, Collection, GatewayIntentBits, Partials, Events, Options } = require("discord.js");
const { error, info, success, warn } = require("./helpers/Logger/Log");
const mongoose = require('mongoose')
const { checkSwear, checkAdvers } = require("./helpers/Check/WordCheck")
const logs = require("discord-logs");
module.exports = class extends Client {
  constructor() {
    super({
      sweepers: {
        ...Options.DefaultSweeperSettings,
        messages: {
          interval: 3600, // Every hour...
          lifetime: 1800, // Remove messages older than 30 minutes.
        },
      },
      
      intents: 3276799,

      scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.User,
        Partials.GuildMember,
        Partials.ThreadMember,
        Partials.GuildScheduledEvent,
      ],

      ws: {
        version: "10",
      },
    });

    global.client = this;

    process.on("unhandledRejection", (reason, promise) => { warn(reason, promise) })
    process.on("uncaughtException", (err) => { if (err === "DiscordAPIError[10062]: Unknown interaction" || err === "DiscordAPIError[40060]: Interaction has already been acknowledged.") return; error(err) })
    process.on("uncaughtExceptionMonitor", (err) => { if (err === "DiscordAPIError[10062]: Unknown interaction" || err === "DiscordAPIError[40060]: Interaction has already been acknowledged.") return; error(err); })
  }
  
  
  async start() {
    require("./handlers/commandLoader");
    require("./handlers/eventHandler")(this);
    require("./handlers/commandHandler")(this);
    logs(this);
    require("./dashboard/App")
    await this.login(BOT.token).catch(e => error(e))
    
   await mongoose.connect(DATABASE.mongooseConnection).then(x => success("MongoDB bağlantısı kuruldu!")).catch(err => error(err));
  };
};
