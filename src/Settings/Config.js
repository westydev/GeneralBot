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
      { id: "adversguard-settings", name: "Advers Guard", despriction: "Set Guild Advers Guard.", action: "Set" },
      { id: "swearguard-settings", name: "Swear Guard", despriction: "Set Guild Swear Guard.", action: "Set" },
      { id: "blacklistedword-settings", name: "Blacklist Word Guard", despriction: "Set Guild Blacklist Word Guard.", action: "Set" },
      { id: "characterlimit-settings", name: "Character Limit Guard", despriction: "Set Guild Character Limit Guard.", action: "Set" },
      { id: "newaccountbypass-settings", name: "New Account Bypass", despriction: "Set Guild New Account Bypass Guard.", action: "Set" },
      { id: "rolelog-settings", name: "Role Log", despriction: "Set Guild Role Log Settings.", action: "Set" },
      { id: "joinquit-settings", name: "Join-Quit Log", despriction: "Set Guild Join-Quit Log Settings.", action: "Set" },
      { id: "voicelog-settings", name: "Voice Log", despriction: "Set Guild Voice Log Settings.", action: "Set" },
      { id: "otorol-settings", name: "Otorol", despriction: "Set Guild Otorol Settings.", action: "Set" },
      { id: "punish-list", name: "Guild Punish List", despriction: "View Guild Punishment List.", action: "View" },
      { id: "rolelog", name: "Guild RoleLog List", despriction: "View Guild RoleLog List.", action: "View" }
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