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
      "quantity",
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
    quantity: 0,
  };

  await Products.create(newProduct)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: locale.translate("errors.products.onCreate") });
    });
};

const update = async (req, res) => {
  await Products.sync();
  const id = req.params.id;
  const { product, cost, supplies, category } = req.body;

  if (product && cost && category) {
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
            message: locale.translate("success.products.onUpdate"),
          })
        )
        .catch((err) =>
          res.status(500).json({
            message: `${locale.translate("errors.products.onUpdate")} ${id}`,
          })
        );
    } else {
      res.status(500).json({
        message: `${locale.translate("errors.products.notExists")} ${id}`,
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
        .json({ message: locale.translate("success.products.onDelete") });
    } catch (err) {
      res.status(500).json({
        message: `${locale.translate("errors.products.onDelete")} ${found.id}`,
      });
      console.log("error al eliminar");
    }
  } else {
    console.log("producto no existe!");
    res
      .status(400)
      .json({ message: locale.translate("errors.products.notExists") });
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
      "quantity",
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
        .json({ message: locale.translate("errors.products.notExists") });
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
