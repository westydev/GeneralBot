const { BOT } = require("../../Settings/Config") 
const Server = require("../../database/Server");
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
    }
}

module.exports = { checkOwner, checkPermission, checkLanguage };