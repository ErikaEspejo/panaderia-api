const express = require("express");
const { create } = require("./controller");
const { logger } = require("../middleware/logger");
//const { validateUser, validateLogin } = require("../middleware/validator");
const { authenticator } = require("../middleware/authenticator");
//const { usersAuthorization } = require("../middleware/authorization");

const router = express.Router();

router.use(logger);

router
  .route("/")
  .post(create)
/*  .delete(authenticator, usersAuthorization, remove)
  .post(validateUser, create);

router.route("/login").post(validateLogin, login);

router.route("/logout").get(logout);

router
  .route("/:id") //
  .put(authenticator, usersAuthorization, validateUser, update); */

module.exports = router;
