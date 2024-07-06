const { check } = require("express-validator");
const UserRepo = require("../../repositories/user");
const ncrypt = require("../../libs/ncrypt");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Enter a valid email")
    .custom(async (email) => {
      const existingUser = await UserRepo.getOneBy({ email });
      if (existingUser) throw new Error("Email already in use.");
    }),

  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be min of 4 and max 6 length"),

  requireConfirmPassword: check("confirmPassword")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("confirm password must be min of 4 and max of 20 in length")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password)
        throw new Error("Passwords must match");
    }),

  requireEmailExists: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valid email")
    .custom(async (email) => {
      const user = await UserRepo.getOneBy({ email });
      if (!user) throw new Error("Email not found.");
    }),

  requireValidPassword: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await UserRepo.getOneBy({ email: req.body.email });
      if (!user) throw new Error("Invalid password");

      const isPassword = await ncrypt.compare(password, user.password);
      if (!isPassword) throw new Error("invalid password");
    }),
};
