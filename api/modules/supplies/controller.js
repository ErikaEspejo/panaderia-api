const { locale } = require("../../../locale");
const Supplies = require("./model");
const Providers = require("../providers/model");

const list = async (req, res) => {
  Supplies.findAll({
    include: [{ model: Providers }],
  }).then(async (supplies) => {
    res.status(200).json({
      data: supplies,
    });
  });
};

const create = async (req, res) => {
  await Supplies.sync();
  const { name, quantity, units, totalCost, type, ProviderId } = req.body;

  const newSupply = {
    name,
    quantity,
    units,
    totalCost,
    type,
    ProviderId,
  };

  console.log(newSupply);

  await Supplies.create(newSupply)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: locale.translate("errors.supplies.onCreate") });
    });
};

const update = async (req, res) => {
  await Supplies.sync();
  const id = req.params.id;
  const { name, quantity, units, totalCost, type, ProviderId } = req.body;

  if (name && quantity && units && totalCost && type && ProviderId) {
    const supplyUpdated = {
      name,
      quantity,
      units,
      totalCost,
      type,
      ProviderId,
    };

    const found = await Supplies.findOne({
      where: { supply_id: id },
    });

    if (found) {
      await found
        .update({
          name: supplyUpdated.name,
          quantity: supplyUpdated.quantity,
          units: supplyUpdated.units,
          totalCost: supplyUpdated.totalCost,
          type: supplyUpdated.type,
          ProviderId: supplyUpdated.ProviderId,
        })
        .then(() =>
          res.status(204).json({
            message: locale.translate("success.supplies.onUpdate"),
          })
        )
        .catch((err) =>
          res.status(500).json({
            message: `${locale.translate("errors.supplies.onUpdate")} ${id}`,
          })
        );
    } else {
      res.status(500).json({
        message: `${locale.translate("errors.supplies.notExists")} ${id}`,
      });
    }
  } else {
    res.status(500).json({ message: locale.translate("errors.invalidData") });
  }
};

const remove = async (req, res) => {
  await Supplies.sync();
  const { supply_id } = req.body;

  const found = await Supplies.findOne({
    where: { supply_id },
  });

  if (found) {
    try {
      found.destroy();
      console.log("Borrado correctamente");
      res
        .status(200)
        .json({ message: locale.translate("success.supplies.onDelete") });
    } catch (err) {
      res.status(500).json({
        message: `${locale.translate("errors.supplies.onDelete")} ${found.id}`,
      });
      console.log("error al eliminar");
    }
  } else {
    console.log("hallazgo no existe!");
    res
      .status(400)
      .json({ message: locale.translate("errors.quality.notExists") });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  await Supplies.findOne({
    where: { supply_id: id },
    include: [{ model: Providers }],
  }).then(async (supply) => {
    if (supply) {
      res.status(200).json({
        data: supply,
      });
    } else {
      res
        .status(400)
        .json({ message: locale.translate("errors.supplies.notExists") });
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
