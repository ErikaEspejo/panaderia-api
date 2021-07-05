const { locale } = require("../../locale");

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  const errors = [];

  if (username && password) {
    if (username.length < 6) {
      errors.push(locale.translate("errors.validate.invalidUsername"));
    }
  } else {
    errors.push(locale.translate("errors.validate.emptyData"));
  }

  if (errors.length === 0) {
    next();
  } else {
    res.status(500).json({ message: errors });
  }
};

module.exports = {
  validateLogin,
};
