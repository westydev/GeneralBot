const fs = require('fs')
const path = require('path')
const { Collection } = require('discord.js')

module.exports = (client) => {
client.commands = new Collection()
const commandFiles = []
    
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
  getFilesRecursively('./commands/')

  for (const file of commandFiles) {
    const command = require(`../../${file}`)
    client.commands.set(command.data.name, command)
  }
}