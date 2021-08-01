const express = require("express");
const {
  listFindingTypes,
  listCostTypes,
  listPositionTypes,
  listSupplyTypes,
  createFindingType,
  createCostType,
  createPositionType,
  createSupplyType,
} = require("./controller");
const { logger } = require("../../middleware/logger");
const { authenticator } = require("../../middleware/authenticator");

const router = express.Router();

router.use(logger);

router
  .route("/findings")
  .post(authenticator, createFindingType)
  .get(authenticator, listFindingTypes);
router
  .route("/costs")
  .post(authenticator, createCostType)
  .get(authenticator, listCostTypes);
router
  .route("/position")
  .post(authenticator, createPositionType)
  .get(authenticator, listPositionTypes);
router
  .route("/supply")
  .post(authenticator, createSupplyType)
  .get(authenticator, listSupplyTypes);

module.exports = router;
