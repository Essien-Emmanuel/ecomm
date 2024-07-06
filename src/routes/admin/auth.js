const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const UserRepo = require("../../repositories/user");
const ncrypt = require("../../libs/ncrypt");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [
    check("email").trim().normalizeEmail().isEmail(),
    check("password").trim().isLength({ min: 4, max: 20 }),
    check("confirmPassword").trim().isLength({ min: 4, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    const { email, password, confirmPassword } = req.body;
    const existingUser = await UserRepo.getOneBy({ email });

    if (existingUser) return res.send("Account already created.");

    if (password.length < 6)
      return res.send("Password must be of min length of 6");

    if (confirmPassword !== password) return res.send("Passwords must match.");

    const hashedPassword = await ncrypt.hash(password);

    const user = await UserRepo.create({ email, password: hashedPassword });
    req.session.userId = user.id;

    res.send("Account created!!!");
  }
);

router.get("/signin", (_req, res) => {
  res.send(signinTemplate());
});

router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserRepo.getOneBy({ email });
  if (!user) return res.send("User not found.");

  const isPassword = await ncrypt.compare(password, user.password);
  if (!isPassword) return res.send("Incorrect password");

  req.session.userId = user.id;

  return res.send("User logged in successfully.");
});

router.get("/signout", (req, res, _next) => {
  req.session = null;
  return res.send("You are logged out.");
});

module.exports = router;
