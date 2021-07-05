const { locale } = require("../../locale");
const Costs = require("./model");

const list = async (req, res) => {
  Costs.findAll({
    attributes: [
      "id",
      "date",
      "costName",
      "costType",
      "costValue",
      "createdAt",
      "updatedAt",
    ],
  }).then(async (cost) => {
    res.status(200).json({
      data: cost,
    });
  });
};

const create = async (req, res) => {
  await Costs.sync();
  const { date, costName, costType, costValue } = req.body;

  const cost = {
    date,
    costName,
    costType,
    costValue,
  };

  await Costs.create(cost)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: locale.translate("errors.costs.onCreate") });
    });
};

const update = async (req, res) => {
  await Costs.sync();
  const id = req.params.id;
  const { costName, costType, costValue } = req.body;

  if (costName && costType && costValue) {
    const costUpdated = {
      costName,
      costType,
      costValue,
    };

    const found = await Costs.findOne({
      where: { id },
    });

    if (found) {
      await found
        .update({
          costName: costUpdated.costName,
          costType: costUpdated.costType,
          costValue: costUpdated.costValue,
        })
        .then(() =>
          res.status(204).json({
            message: locale.translate("success.costs.onUpdate"),
          })
        )
        .catch((err) =>
          res.status(500).json({
            message: `${locale.translate("errors.costs.onUpdate")} ${id}`,
          })
        );
    } else {
      res.status(500).json({
        message: `${locale.translate("errors.costs.notExists")} ${id}`,
      });
    }
  } else {
    res.status(500).json({ message: locale.translate("errors.invalidData") });
  }
};

const remove = async (req, res) => {
  await Costs.sync();
  const { id } = req.body;

  const found = await Costs.findOne({
    where: { id },
  });

  if (found) {
    try {
      found.destroy();
      console.log("Borrado correctamente");
      res
        .status(200)
        .json({ message: locale.translate("success.costs.onDelete") });
    } catch (err) {
      res.status(500).json({
        message: `${locale.translate("errors.costs.onDelete")} ${found.id}`,
      });
      console.log("error al eliminar");
    }
  } else {
    console.log("costo no existe!");
    res
      .status(400)
      .json({ message: locale.translate("errors.costs.notExists") });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  await Costs.findOne({
    where: { id },
    attributes: [
      "id",
      "date",
      "costName",
      "costType",
      "costValue",
      "createdAt",
      "updatedAt",
    ],
  }).then(async (cost) => {
    if (cost) {
      res.status(200).json({
        data: cost,
      });
    } else {
      res
        .status(400)
        .json({ message: locale.translate("errors.costs.notExists") });
    }
  });
};

module.exports = {
  list,
  create,
  update,
  remove,
  getOne,
};
