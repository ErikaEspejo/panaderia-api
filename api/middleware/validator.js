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

const validateNewUser = (req, res, next) => {
  const {
    identificationNumber,
    email,
    username,
    password,
    passwordConfirmation,
  } = req.body;

  const errors = [];
  const regExpEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const regExpPassword = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  );
  const regExpId = new RegExp(/^[a-zA-Z0-9_]*$/);

  if (
    identificationNumber &&
    email &&
    username &&
    password &&
    passwordConfirmation
  ) {
    if (username.length < 6) {
      errors.push(locale.translate("errors.validate.invalidUsername"));
    }

    if (!regExpEmail.test(email)) {
      errors.push(locale.translate("errors.validate.invalidEmail"));
    }
    if (!regExpPassword.test(password)) {
      errors.push(locale.translate("errors.validate.invalidPassword"));
    }
    if (password !== passwordConfirmation) {
      errors.push(locale.translate("errors.validate.passwordsDontMatch"));
    }
    if (!regExpId.test(identificationNumber)) {
      errors.push(locale.translate("errors.validate.invalidId"));
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

const validateUserUpdated = (req, res, next) => {
  const { email, username, password, position, state, name, lastname } =
    req.body;

  const errors = [];
  const regExpEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const regExpPassword = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  );

  if (email && username && password) {
    if (username.length < 6) {
      errors.push(locale.translate("errors.validate.invalidUsername"));
    }

    if (!regExpEmail.test(email)) {
      errors.push(locale.translate("errors.validate.invalidEmail"));
    }
    if (!regExpPassword.test(password)) {
      errors.push(locale.translate("errors.validate.invalidPassword"));
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
  validateNewUser,
  validateUserUpdated,
};
