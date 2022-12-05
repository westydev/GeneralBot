const { BOT } = require("./Settings/Config")
const { OAuth2Scopes, Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { error, info, success, warn } = require("./helpers/Logger/Log");

module.exports = class extends Client {
  constructor() {
    super ({
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
  
  start() {
    require("./handlers/commandLoader");
    require("./handlers/eventHandler")(this);
    require("./handlers/commandHandler")(this);

    this.login(BOT.token).catch(e => error(e))
  };
};