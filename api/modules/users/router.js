const express = require("express");
const {
  list,
  create,
  update,
  remove,
  getUser,
  login,
  logout,
} = require("./controller");
const { logger } = require("../../middleware/logger");
const {
  validateLogin,
  validateNewUser,
  validateUserUpdated,
} = require("../../middleware/validator");
const { authenticator } = require("../../middleware/authenticator");
const { usersAuthorization } = require("../../middleware/authorization");

const router = express.Router();

router.use(logger);

router
  .route("/")
  .post(validateNewUser, create)
  .get(authenticator, list)
  .delete(authenticator, usersAuthorization, remove);

router.route("/login").post(validateLogin, login);

router.route("/logout").get(logout);

router
  .route("/:identificationNumber")
  .put(authenticator, usersAuthorization, validateUserUpdated, update)
  .get(authenticator, getUser);

module.exports = router;
