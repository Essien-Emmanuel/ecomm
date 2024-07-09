const router = require("express").Router();

const ProductRepo = require("../../repositories/product");
const productIndexTemplate = require("../../views/user/product/index");

router.get("/", async (req, res) => {
  const products = await ProductRepo.getAll();
  res.send(productIndexTemplate({ products }));
});

module.exports = router;
