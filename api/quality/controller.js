const { locale } = require("../../locale");
const Quality = require("./model");

const list = async (req, res) => {
  Quality.findAll({
    attributes: [
      "id",
      "date",
      "findingType",
      "finding",
      "actions",
      "accomplishment",
      "createdAt",
      "updatedAt",
    ],
  }).then(async (findings) => {
    res.status(200).json({
      data: findings,
    });
  });
};

const create = async (req, res) => {
  await Quality.sync();
  const { date, findingType, finding, actions, accomplishment } = req.body;

  const newFinding = {
    date,
    findingType,
    finding,
    actions,
    accomplishment,
  };

  await Quality.create(newFinding)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: locale.translate("errors.quality.onCreate") });
    });
};

const update = async (req, res) => {
  await Quality.sync();
  const id = req.params.id;
  const { findingType, finding, actions, accomplishment } = req.body;

  if (findingType && finding && actions && accomplishment) {
    const findingUpdated = {
      findingType,
      finding,
      actions,
      accomplishment,
    };

    const found = await Quality.findOne({
      where: { id },
    });

    if (found) {
      await found
        .update({
          findingType: findingUpdated.findingType,
          finding: findingUpdated.finding,
          actions: findingUpdated.actions,
          accomplishment: findingUpdated.accomplishment,
        })
        .then(() =>
          res.status(204).json({
            message: locale.translate("success.quality.onUpdate"),
          })
        )
        .catch((err) =>
          res.status(500).json({
            message: `${locale.translate("errors.quality.onUpdate")} ${id}`,
          })
        );
    } else {
      res.status(500).json({
        message: `${locale.translate("errors.quality.notExists")} ${id}`,
      });
    }
  } else {
    res.status(500).json({ message: locale.translate("errors.invalidData") });
  }
};

const remove = async (req, res) => {
  await Quality.sync();
  const { id } = req.body;

  const found = await Quality.findOne({
    where: { id },
  });

  if (found) {
    try {
      found.destroy();
      console.log("Borrado correctamente");
      res
        .status(200)
        .json({ message: locale.translate("success.quality.onDelete") });
    } catch (err) {
      res.status(500).json({
        message: `${locale.translate("errors.quality.onDelete")} ${found.id}`,
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
  await Quality.findOne({
    where: { id },
    attributes: [
      "id",
      "date",
      "findingType",
      "finding",
      "actions",
      "accomplishment",
      "createdAt",
      "updatedAt",
    ],
  }).then(async (finding) => {
    if (finding) {
      res.status(200).json({
        data: finding,
      });
    } else {
      res
        .status(400)
        .json({ message: locale.translate("errors.quality.notExists") });
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
