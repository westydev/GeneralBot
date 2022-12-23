const fs = require('fs')
const path = require('path')
const { Routes, REST } = require("discord.js");
const { BOT } = require('../Settings/Config')
const { error, info, success, warn } = require("../helpers/Logger/Log");

const commands = []
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))
const HandlerMode = BOT.HandlerMode;

const getFilesRecursively = (directory) => {
  const filesInDirectory = fs.readdirSync(directory)
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file)
    if (fs.statSync(absolute).isDirectory()) {
      getFilesRecursively(absolute)
    } else {
      commandFiles.push(absolute)
    }
  }
}
getFilesRecursively('./src/commands/')

for (const file of commandFiles) {
  const command = require(`../../${file}`)
  commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(BOT.token);

(async () => {
  try {
    if(HandlerMode.toLocaleUpperCase === "GUILD" || HandlerMode.toLowerCase === "guild" || HandlerMode === "Guild") {

    await rest.put(
      Routes.applicationGuildCommands(BOT.appID, BOT.guildId),
      { body: commands }
    )
    } else if(HandlerMode.toLocaleUpperCase === "GLOBAL" || HandlerMode.toLowerCase === "global" || HandlerMode === "Global") {

      await rest.put(
        Routes.applicationCommands(BOT.appID),
        { body: commands }
      )

    } else {
     error("[Command-Loader] Geçersiz HandlerModu.");
      process.exit(0)
    }

    success("[Command-Loader] Komutlar yüklendi!");
  } catch (error) {
    console.error(error)
  }
})()


