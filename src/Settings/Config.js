module.exports = {
  BOT: {
    token:
      "",
    appID: "1049362208582271037",
    botActivity: "Discord.JS V14 GeneralBot",
    guildId: "1049361460251340810",
    HandlerMode: "Global",
    owners: ["993754957985632266", "946794678064406608"],
  },
  DATABASE: {
    mongooseConnection:
      "",
  },
  DASHBOARD: {
    enabled: true,
    port: 3000,
    main: "http://localhost:3000/",
    AUTH: {
      clientID: "1049362208582271037",
      clientSecret: "",
      callbackURL: "http://localhost:3000/login/discord",
      scope: ["identify", "guilds"],
      sessionSecret: "privatePassword-ws",
    },
    settingList: [
      { id: "lang-settings", name: "Language", despriction: "Set Guild Language.", action: "Set" },
      { id: "punish-list", name: "Guild Punish List", despriction: "View Guild Punishment List.", action: "View" },
    ],
  },
  AI: {
    ToxicityPoints: {
      Swear: 4,
      Advertising: 3,
      CapsLock: 2, 
      Advers: 1
    }
  },
  BOTLOGS: {
    DmLogChannel: "",
    GuildLog: ""
  }
};