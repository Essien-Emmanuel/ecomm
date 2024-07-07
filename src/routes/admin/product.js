const router = require("express").Router();
const multer = require("multer");

const ProductRepo = require("../../repositories/product");
const productsNewTemplate = require("../../views/admin/product/new");
const productIndexTemplate = require("../../views/admin/product/index");
const { requireTitle, requirePrice } = require("./validators");
const { handleError } = require("./middlewares");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/admin/products", async (req, res) => {
  const products = await ProductRepo.getAll();
  res.send(productIndexTemplate({ products }));
});

router.get("/admin/products/new", (req, res) => {
  res.send(productsNewTemplate({}));
});

router.post(
  "/admin/products/new",
  upload.single("image"),
  [requireTitle, requirePrice],
  handleError(productsNewTemplate),
  async (req, res) => {
    const { title, price } = req.body;
    const image = req.file.buffer.toString("base64");

    await ProductRepo.create({
      title,
      price,
      image,
    });

    res.send("submitted");
  }
);
module.exports = router;
