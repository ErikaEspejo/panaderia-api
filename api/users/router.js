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
const { logger } = require("../middleware/logger");
const { validateLogin } = require("../middleware/validator");
const { authenticator } = require("../middleware/authenticator");
//const { usersAuthorization } = require("../middleware/authorization");

const router = express.Router();

router.use(logger);

router
  .route("/")
  .post(create) //validateUser
  .get(authenticator, list)
  .delete(authenticator, remove); // usersAuthorization,

router.route("/login").post(validateLogin, login);

router.route("/logout").get(logout);

router
  .route("/:identificationNumber") //
  .put(authenticator, update) // usersAuthorization, validateUser,
  .get(getUser);

module.exports = router;
