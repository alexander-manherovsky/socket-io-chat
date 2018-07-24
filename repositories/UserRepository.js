const Repository = require("./generalRepository");
const User = require("../models/user");

function UserRepository() {
  Repository.prototype.constructor.call(this);
  this.model = User;
}

// UserRepository.prototype = new Repository();
UserRepository.prototype = Object.create(Repository.prototype);
UserRepository.prototype.constructor = UserRepository;


module.exports = new UserRepository();
