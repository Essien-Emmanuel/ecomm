module.exports = {
  getError(errors, prop) {
    try {
      console.log("errors ", errors, "prop", prop);
      console.log(errors.mapped()[prop].msg);
      return errors.mapped()[prop].msg;
    } catch (error) {
      return "";
    }
  },
};
