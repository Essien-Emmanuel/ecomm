const router = require("express").Router();

const CartRepo = require("../../repositories/cart");
const ProductRepo = require("../../repositories/product");
const cartShowTemplate = require("../../views/user/cart/show");

router.post("/cart/products", async (req, res) => {
  let cart = {};

  if (!req.session.cartId) {
    cart = await CartRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await CartRepo.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );

  if (existingItem) existingItem.quantity++;
  else cart.items.push({ id: req.body.productId, quantity: 1 });

  await CartRepo.update(cart.id, {
    items: cart.items,
  });

  res.redirect("/cart");
});

router.get("/cart", async (req, res) => {
  if (!req.session.cartId) return res.redirect("/");

  const cart = await CartRepo.getOne(req.session.cartId);

  for (const item of cart.items) {
    const product = await ProductRepo.getOne(item.id);
    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

router.post("/cart/products/delete", async (req, res) => {
  const { itemId } = req.body;
  const { cartId } = req.session;

  const cart = await CartRepo.getOne(cartId);

  const remainingItems = cart.items.filter((item) => item.id !== itemId);

  await CartRepo.update(cartId, { items: remainingItems });

  res.redirect("/cart");
});
module.exports = router;
