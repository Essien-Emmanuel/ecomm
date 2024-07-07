const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const ncrypt = require("../../libs/ncrypt");
const UserRepo = require("../../repositories/user");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");
const { confirmPasswordValidator } = require("../../middleware/index");

const {
  requireEmail,
  requirePassword,
  requireConfirmPassword,
  requireEmailExists,
  requireValidPassword,
} = require("./validators");

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [
    requireEmail,
    requirePassword,
    check("confirmPassword")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Must be between 4 to 20 characters long"),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = confirmPasswordValidator(req);

    if (!errors.isEmpty()) return res.send(signupTemplate({ errors }));

    const hashedPassword = await ncrypt.hash(password);

    const user = await UserRepo.create({ email, password: hashedPassword });
    req.session.userId = user.id;

    res.send("Account created!!!");
  }
);

router.get("/signin", (_req, res) => {
  res.send(signinTemplate({}));
});

router.post(
  "/signin",
  [requireEmailExists, requireValidPassword],
  async (req, res, _next) => {
    const { email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.send(signinTemplate({ errors }));

    const user = await UserRepo.getOneBy({ email });
    req.session.userId = user.id;

    return res.send("User logged in successfully.");
  }
);

router.get("/signout", (req, res, _next) => {
  req.session = null;
  return res.send("You are logged out.");
});

module.exports = router;
