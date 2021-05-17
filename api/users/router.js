const express = require("express");
const { list, create } = require("./controller");
const { logger } = require("../middleware/logger");
//const { validateUser, validateLogin } = require("../middleware/validator");
const { authenticator } = require("../middleware/authenticator");
//const { usersAuthorization } = require("../middleware/authorization");

const router = express.Router();

router.use(logger);

router
  .route("/")
  .post(create) //validateUser
  .get(list)
 // .delete(authenticator, usersAuthorization, remove)

/*router.route("/login").post(validateLogin, login);

router.route("/logout").get(logout);

router
  .route("/:id") //
  .put(authenticator, usersAuthorization, validateUser, update); */

module.exports = router;
