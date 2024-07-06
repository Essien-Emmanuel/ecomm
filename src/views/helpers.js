module.exports = {
  getError() {
    try {
      return errors.mapped()[prop].msg;
    } catch (error) {
      return "";
    }
  },
};
