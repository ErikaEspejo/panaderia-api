const FindingType = require("./models/findingType");
const CostType = require("./models/costType");
const PositionType = require("./models/positionType");
const SupplyType = require("./models/supplyType");

const listFindingTypes = async (req, res) => {
  FindingType.findAll({
    attributes: ["id", "type"],
  }).then(async (type) => {
    res.status(200).json({
      data: type,
    });
  });
};
const listCostTypes = async (req, res) => {
  CostType.findAll({
    attributes: ["id", "type"],
  }).then(async (type) => {
    res.status(200).json({
      data: type,
    });
  });
};
const listPositionTypes = async (req, res) => {
  PositionType.findAll({
    attributes: ["id", "type"],
  }).then(async (type) => {
    res.status(200).json({
      data: type,
    });
  });
};
const listSupplyTypes = async (req, res) => {
  SupplyType.findAll({
    attributes: ["id", "type"],
  }).then(async (type) => {
    res.status(200).json({
      data: type,
    });
  });
};

const createFindingType = async (req, res) => {
  await FindingType.sync();
  const { type } = req.body;

  const newType = {
    type,
  };

  await FindingType.create(newType)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: locale.translate("Error while creating type") });
    });
};

const createCostType = async (req, res) => {
  await CostType.sync();
  const { type } = req.body;

  const newType = {
    type,
  };

  await CostType.create(newType)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: locale.translate("Error while creating type") });
    });
};
const createPositionType = async (req, res) => {
  await PositionType.sync();
  const { type } = req.body;

  const newType = {
    type,
  };

  await PositionType.create(newType)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: locale.translate("Error while creating type") });
    });
};
const createSupplyType = async (req, res) => {
  await SupplyType.sync();
  const { type } = req.body;

  const newType = {
    type,
  };

  await SupplyType.create(newType)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: locale.translate("Error while creating type") });
    });
};

module.exports = {
  listFindingTypes,
  listCostTypes,
  listPositionTypes,
  listSupplyTypes,
  createFindingType,
  createCostType,
  createPositionType,
  createSupplyType,
};
