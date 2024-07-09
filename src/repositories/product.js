const Repository = require("./repo");

class ProductRepository extends Repository {
  constructor(filename) {
    super(filename);
  }
}

module.exports = new ProductRepository("src/dataStore/Products.json");
