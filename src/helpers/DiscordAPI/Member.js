class Member {
  constructor({ client, userID, guildID }) {
    this.client = client;
    this.userID = userID;
    this.guildID = guildID;
  }

  async getMember() {
   return await this.client.guilds.cache.get(this.guildID).members.cache.get(this.userID);
  }
  async getRoles() {
   return await this.client.guilds.cache.get(this.guildID).members.cache.get(this.userID)._roles;
  }
  async getJoinedTimepast() {
    return await this.client.guilds.cache.get(this.guildID).members.cache.get(this.userID).joinedTimestamp;
  }
  async getNickname() {
    return await this.client.guilds.cache.get(this.guildID).members.cache.get(this.userID).nickname;
  }
  async getPending() {
     return await this.client.guilds.cache.get(this.guildID).members.cache.get(this.userID).pending;
  }
}

module.exports = { Member };