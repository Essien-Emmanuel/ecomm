const Repository = require("./repo");

class UserRepository extends Repository {
  constructor(filename) {
    super(filename);
  }
}

module.exports = new UserRepository("src/dataStore/Users.json");
