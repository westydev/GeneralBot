const { BOT } = require("../../Settings/Config") 

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

module.exports = { checkOwner, checkPermission };