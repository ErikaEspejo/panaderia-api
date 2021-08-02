const express = require("express");
const { list, create, remove, getOne } = require("./controller");
const { logger } = require("../../middleware/logger");
const { authenticator } = require("../../middleware/authenticator");

const router = express.Router();

router.use(logger);

router
  .route("/")
  .post(authenticator, create)
  .get(authenticator, list)
  .delete(authenticator, remove);

module.exports = router;
