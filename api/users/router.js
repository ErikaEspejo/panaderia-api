const express = require("express");
const { list, create, update, remove } = require("./controller");
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
  .delete(remove)//authenticator, usersAuthorization,

/*router.route("/login").post(validateLogin, login);

router.route("/logout").get(logout);
*/
router
  .route("/:identificationNumber") //
  .put(update); //authenticator, usersAuthorization, validateUser,

module.exports = router;
