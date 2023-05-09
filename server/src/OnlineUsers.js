module.exports = class OnlineUsers {
  constructor() {
    this.users = [];
    this.addUser = this.addUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }
  addUser(user) {
    this.users = [...this.users, user];
  }
  getUser(id) {
    return this.users.find((user) => user.id === id);
  }
  removeUser(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }
};
