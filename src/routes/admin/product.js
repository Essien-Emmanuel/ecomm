const router = require("express").Router();
const multer = require("multer");

const { validationResult } = require("express-validator");
const ProductRepo = require("../../repositories/product");
const productsNewTemplate = require("../../views/admin/product/new");
const { requireTitle, requirePrice } = require("./validators");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", (req, res) => {});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  "/admin/products/new",
  upload.single("image"),
  [requireTitle, requirePrice],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.send(productsNewTemplate({ errors }));

    const { title, price } = req.body;
    const image = req.file.buffer.toString("base64");

    const newProduct = await ProductRepo.create({
      title,
      price,
      image,
    });

    res.send("submitted");
  }
);
module.exports = router;
