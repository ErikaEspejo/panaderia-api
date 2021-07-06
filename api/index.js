const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");
const { localization } = require("./middleware/localization");

const users = require("./modules/users/router");
const quality = require("./modules/quality/router");
const costs = require("./modules/costs/router");
const provider = require("./modules/providers/router");

const { config } = require("../config");

const router = express.Router();
const accessLogDir = config.log.access;
const logStream = fs.createWriteStream(path.join(__dirname, accessLogDir), {
  flags: "a",
});

router.use(helmet());
router.use(morgan("combined", { stream: logStream }));
router.use(localization);
router.use("/users", users);
router.use("/quality", quality);
router.use("/costs", costs);
router.use("/providers", provider);

module.exports = router;
