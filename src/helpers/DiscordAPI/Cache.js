async function clearCache(client) {
    client.users.cache.forEach((element) => {
      if (element.id !== client.user.id) {
        client.users.cache.delete(element.id);
      }
    });
    client.guilds.cache.forEach((element) => {
      client.guilds.cache.delete(element.id);
    });
    client.channels.cache.forEach((element) => {
      client.channels.cache.delete(element.id);
    });
    client.emojis.cache.forEach((element) => {
      client.emojis.cache.delete(element.id);
    });
}

module.exports = { clearCache }