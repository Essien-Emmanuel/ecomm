const { check, validationResult } = require("express-validator");
const UserRepo = require("../../repositories/user");
const ncrypt = require("../../libs/ncrypt");

module.exports = {
  requireTitle: check("title")
    .trim()
    .isLength({ min: 5, max: 40 })
    .withMessage("Must be between 5 to 20 characters"),
  requirePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage("Must be a number greater than 1"),
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
    .withMessage("Must be between 4 to 20 characters"),

  requireConfirmPassword: check("confirmPassword")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 to 20 characters")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password)
        throw new Error("Passwords must match");
      console.log("here");
      console.log("chain ", validationResult(req));
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
