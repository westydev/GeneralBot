const { BOT } = require("../../Settings/Config") 
const { User, Server } = require("../../database/Databases");
const tr_TR = require("../../Settings/Assets/tr_TR.json")
const en_EN = require("../../Settings/Assets/en_EN.json");


const Owners = BOT.owners;

function checkOwner(id) {
    if (Owners.some((a) => id === a)) {
        return true;
    } else {
        return false;
    }
}

async function checkPermission(interaction, requiredPermission) {
    if(interaction.member.permissions.has(requiredPermission)) {
        return true
    } else {
        return false;
    }
}

async function checkLanguage({guildID}) {
    const serverData = await Server.findOne({ id: guildID });

    const serverLanguage = await serverData.lang;

    switch (serverLanguage) {
      case "tr_TR":
        return tr_TR;
      case "en_US":
        return en_EN;
      default:
        break;
    };   
};
async function checkUserForDatabase(id) {
  const user = await User.findOne({ id: id });
  if (user) {
    return user;
  }
  if (!user) {
    const nUser = new User({
      id: id,
    });
    nUser.save();
    return user;
  }
}

async function guildSystemsEnabled(id) {
    const Guild = await Server.findOne({ id: id });

    const response = {};

    const guildLang = Guild.lang;

    const ChatGuard = {};
    const Log = {};
    const GuildGuard = {};

    ChatGuard["SwearGuard"] = Guild.SwearGuard;
    ChatGuard["AdversGuard"] = Guild.AdversGuard;
    ChatGuard["Whitelists"] = Guild.ChatGuardWhitelists;
    ChatGuard["SwearGuardProcess"] = Guild.SwearGuardProcess;
    ChatGuard["AdversGuardProcess"] = Guild.AdversGuardProcess;
    ChatGuard["BlacklistedWords"] = Guild.BlacklistedWords;
    ChatGuard["CharacterLimit"] = Guild.CharacterLimit;

    Log["RoleLog"] = Guild.RoleLog;
    Log["VoiceLogSystem"] = Guild.VoiceLogSystem;

    GuildGuard["NewAccountBypass"] = Guild.NewAccountBypass;

    response["ChatGuard"] = ChatGuard;
    response["ServerLang"] = guildLang;
    response["Log"] = Log;
    response["GuildGuard"] = GuildGuard;

    return response;
}


module.exports = {
  checkOwner,
  checkPermission,
  checkLanguage,
  checkUserForDatabase,
  guildSystemsEnabled,
};