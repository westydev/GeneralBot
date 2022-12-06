class User {
  constructor({ client, userID }) {
    this.client = client;
    this.userID = userID;
  }

  async getUser() {
    return await this.client.users.cache.get(this.userID);
  }
  async getBot() {
    return await this.client.users.cache.get(this.userID).bot;
  }
  async getFlags() {
    return await this.client.users.cache.get(this.userID).flags;
  }
  async getUsername() {
    return await this.client.users.cache.get(this.userID).username;
  }
  async getDiscriminator() {
    return await this.client.users.cache.get(this.userID).discriminator;
  }
  async getAvatar() {
    return await this.client.users.cache.get(this.userID).avatar;
  }
  async getBanner() {
    return await this.client.users.cache.get(this.userID).banner;
  }
  async getAccentColor() {
    return await this.client.users.cache.get(this.userID).accentColor;
  }
}

module.exports = { User }