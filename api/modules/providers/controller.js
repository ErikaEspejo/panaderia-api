const { locale } = require("../../../locale");
const Providers = require("./model");

const list = async (req, res) => {
  Providers.findAll({
    attributes: [
      "id",
      "nit",
      "providerName",
      "providerPhone",
      "providerWeb",
      "address",
      "contactName",
      "contactPhone",
      "contactEmail",
      "supplies",
      "updatedAt",
      "createdAt",
    ],
  }).then(async (provider) => {
    res.status(200).json({
      data: provider,
    });
  });
};

const create = async (req, res) => {
  await Providers.sync();
  const {
    nit,
    providerName,
    providerPhone,
    providerWeb,
    address,
    contactName,
    contactPhone,
    contactEmail,
    supplies,
  } = req.body;

  const newProvider = {
    nit,
    providerName,
    providerPhone,
    providerWeb,
    address,
    contactName,
    contactPhone,
    contactEmail,
    supplies,
  };

  await Providers.create(newProvider)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: locale.translate("errors.provider.onCreate") });
    });
};

const update = async (req, res) => {
  await Providers.sync();
  const id = req.params.id;
  const {
    providerName,
    providerPhone,
    providerWeb,
    address,
    contactName,
    contactPhone,
    contactEmail,
    supplies,
  } = req.body;

  if (
    providerName &&
    providerPhone &&
    address &&
    contactName &&
    contactPhone &&
    supplies
  ) {
    const providerUpdated = {
      providerName,
      providerPhone,
      providerWeb,
      address,
      contactName,
      contactPhone,
      contactEmail,
      supplies,
    };

    const found = await Providers.findOne({
      where: { id },
    });

    if (found) {
      await found
        .update({
          providerName: providerUpdated.providerName,
          providerPhone: providerUpdated.providerPhone,
          providerWeb: providerUpdated.providerWeb,
          address: providerUpdated.address,
          contactName: providerUpdated.contactName,
          contactPhone: providerUpdated.contactPhone,
          contactEmail: providerUpdated.contactEmail,
          supplies: providerUpdated.supplies,
        })
        .then(() =>
          res.status(204).json({
            message: locale.translate("success.provider.onUpdate"),
          })
        )
        .catch((err) =>
          res.status(500).json({
            message: `${locale.translate("errors.provider.onUpdate")} ${id}`,
          })
        );
    } else {
      res.status(500).json({
        message: `${locale.translate("errors.provider.notExists")} ${id}`,
      });
    }
  } else {
    res.status(500).json({ message: locale.translate("errors.invalidData") });
  }
};

const remove = async (req, res) => {
  await Providers.sync();
  const { id } = req.body;

  const found = await Providers.findOne({
    where: { id },
  });

  if (found) {
    try {
      found.destroy();
      console.log("Borrado correctamente");
      res
        .status(200)
        .json({ message: locale.translate("success.provider.onDelete") });
    } catch (err) {
      res.status(500).json({
        message: `${locale.translate("errors.provider.onDelete")} ${found.id}`,
      });
      console.log("error al eliminar");
    }
  } else {
    res
      .status(400)
      .json({ message: locale.translate("errors.provider.notExists") });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  await Providers.findOne({
    where: { id },
    attributes: [
      "id",
      "nit",
      "providerName",
      "providerPhone",
      "providerWeb",
      "address",
      "contactName",
      "contactPhone",
      "contactEmail",
      "supplies",
      "updatedAt",
      "createdAt",
    ],
  }).then(async (provider) => {
    if (provider) {
      res.status(200).json({
        data: provider,
      });
    } else {
      res
        .status(400)
        .json({ message: locale.translate("errors.provider.notExists") });
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
