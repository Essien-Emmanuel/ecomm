const { validationResult } = require("express-validator");

module.exports = {
  handleError(templateFn) {
    return (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.send(templateFn({ errors }));
      next();
    };
  },
};
