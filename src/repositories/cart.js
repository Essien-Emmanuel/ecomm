const Repository = require("./repo");

// class CartRepository extends Repository {
//   constructor(filename) {
//     super(filename);
//   }
// }

class CartRepository extends Repository {}

module.exports = new CartRepository("src/dataStore/Carts.json");
