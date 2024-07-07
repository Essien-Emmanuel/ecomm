const { validationResult } = require("express-validator");

const bodyParser = (req, res, next) => {
  if (req.method === "POST") {
    req.on("data", (data) => {
      const stringifiedDataBuffer = data.toString("utf8");
      formData = parseReqBody(stringifiedDataBuffer);
      req.body = formData;
      next();
    });
  } else {
    next();
  }
};

function parseReqBody(reqBody) {
  const parsed = reqBody.split("&");
  const formData = {};
  for (const pair of parsed) {
    const [key, value] = pair.split("=");
    formData[key] = value;
  }
  return formData;
}

const confirmPasswordValidator = (req) => {
  const { password, confirmPassword } = req.body;

  const errors = validationResult(req);

  if (confirmPassword !== password) {
    const confirmPasswordErrorObj = {
      type: "field",
      value: confirmPassword,
      msg: "passwords must match",
      path: "confirmPassword",
      location: "body",
    };
    if (errors.errors.length < 1) {
      errors.errors.push(confirmPasswordErrorObj);
    } else {
      for (const error of errors.errors) {
        if (error.path !== "confirmPassword") {
          errors.errors.push(confirmPasswordErrorObj);
          break;
        }
      }
    }
  }
  return errors;
};

exports.confirmPasswordValidator = confirmPasswordValidator;
