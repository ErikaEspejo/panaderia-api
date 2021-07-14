const { locale } = require("../../../locale");
const Products = require("./model");

const list = async (req, res) => {
  Products.findAll({
    attributes: [
      "id",
      "product",
      "cost",
      "supplies",
      "category",
      "createdAt",
      "updatedAt",
    ],
  }).then(async (product) => {
    res.status(200).json({
      data: product,
    });
  });
};

const create = async (req, res) => {
  await Products.sync();
  const { product, cost, supplies, category } = req.body;

  const newProduct = {
    product,
    cost,
    supplies,
    category,
  };

  await Products.create(newProduct)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: locale.translate("errors.Products.onCreate") });
    });
};

const update = async (req, res) => {
  await Products.sync();
  const id = req.params.id;
  const { product, cost, supplies, category } = req.body;

  if (product && cost && supplies && category) {
    const productUpdated = {
      product,
      cost,
      supplies,
      category,
    };

    const found = await Products.findOne({
      where: { id },
    });

    if (found) {
      await found
        .update({
          product: productUpdated.product,
          cost: productUpdated.cost,
          supplies: productUpdated.supplies,
          category: productUpdated.category,
        })
        .then(() =>
          res.status(204).json({
            message: locale.translate("success.Products.onUpdate"),
          })
        )
        .catch((err) =>
          res.status(500).json({
            message: `${locale.translate("errors.Products.onUpdate")} ${id}`,
          })
        );
    } else {
      res.status(500).json({
        message: `${locale.translate("errors.Products.notExists")} ${id}`,
      });
    }
  } else {
    res.status(500).json({ message: locale.translate("errors.invalidData") });
  }
};

const remove = async (req, res) => {
  await Products.sync();
  const { id } = req.body;

  const found = await Products.findOne({
    where: { id },
  });

  if (found) {
    try {
      found.destroy();
      console.log("Borrado correctamente");
      res
        .status(200)
        .json({ message: locale.translate("success.Products.onDelete") });
    } catch (err) {
      res.status(500).json({
        message: `${locale.translate("errors.Products.onDelete")} ${found.id}`,
      });
      console.log("error al eliminar");
    }
  } else {
    console.log("costo no existe!");
    res
      .status(400)
      .json({ message: locale.translate("errors.Products.notExists") });
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  await Products.findOne({
    where: { id },
    attributes: [
      "id",
      "product",
      "cost",
      "supplies",
      "category",
      "createdAt",
      "updatedAt",
    ],
  }).then(async (product) => {
    if (product) {
      res.status(200).json({
        data: product,
      });
    } else {
      res
        .status(400)
        .json({ message: locale.translate("errors.Products.notExists") });
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
