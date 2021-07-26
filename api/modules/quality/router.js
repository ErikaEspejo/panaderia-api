const express = require("express");
const { list, create, update, remove, getOne } = require("./controller");
const { logger } = require("../../middleware/logger");
const { authenticator } = require("../../middleware/authenticator");

const router = express.Router();

router.use(logger);

router
  .route("/")
  .post(/* authenticator, */ create)
  .get(/* authenticator, */ list)
  .delete(/* authenticator, */ remove);

router //
  .route("/:id")
  .put(/* authenticator, */ update)
  .get(/* authenticator, */ getOne);

module.exports = router;
