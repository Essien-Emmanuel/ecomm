const router = require("express").Router();

const { validationResult } = require("express-validator");
const ProductRepo = require("../../repositories/product");
const productsNewTemplate = require("../../views/admin/product/new");
const { requireTitle, requirePrice } = require("./validators");

router.get("/admin/products", (req, res) => {});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post("/admin/products/new", [requireTitle, requirePrice], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.send(errors);
  res.send("submitted");
});
module.exports = router;
