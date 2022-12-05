const fs = require('fs')
const path = require('path')

module.exports = (client) => {
const clientEventFiles = fs.readdirSync('./src/events/client').filter(file => file.endsWith('.js'))

for (const file of clientEventFiles) {
  const event = require(`../events/client/${file}`)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
 }  
} 