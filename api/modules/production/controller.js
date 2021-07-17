const { locale } = require("../../../locale");
const Production = require("./model");
const Products = require("../products/model");

const decryptingProduction = (string) => {
  const productionTyped = string.split(";");
  const prod = productionTyped.map((el) => {
    const elementSplitted = el.split(",");
    return {
      product: parseInt(elementSplitted[0]),
      quantity: parseInt(elementSplitted[1]),
    };
  });
  return prod;
};

const list = async (req, res) => {
  const productos = await Products.findAll({
    attributes: ["id", "product"],
  }).then(async (res) => {
    return res.map((el) => {
      return {
        id: el.id,
        name: el.product,
      };
    });
  });

  Production.findAll({
    atributes: ["id", "date", "production"],
  }).then(async (pr) => {
    const production = pr;

    /////
    const result = production.map((el) => {
      //Creacion y asignacion de valores en primer nivel *no modificados*
      const obj = {};
      obj.id = el.id;
      obj.date = el.date;

      //Cambio de string a numero y creacion de array de objetos de productos
      const prod = el.production;
      const productsById = prod.split(";");
      const productionArray = productsById.map((el) => {
        //Creacion de objeto con id
        const arrayWithId = {
          product: parseInt(el.split(",")[0]),
          quantity: parseInt(el.split(",")[1]),
        };

        return arrayWithId;
      });

      obj.production = productionArray;

      const products = obj.production;

      products.map((element) => {
        const filteredProduct = productos.filter((el) => {
          return el.id === element.product;
        });
        const [{ id, name }] = filteredProduct;
        element.product = {
          id,
          name,
        };
      });

      return obj;
    });
    res.status(200).json({
      data: result,
    });
  });
};

const create = async (req, res) => {
  await Production.sync();
  await Products.sync();
  const { production, date } = req.body;

  const newProduction = {
    production,
    date,
  };

  const prod = decryptingProduction(production);

  prod.forEach(async (el) => {
    const found = await Products.findOne({
      where: { id: el.product },
    });

    const newQuantity = found.quantity + el.quantity;

    if (found) {
      await found
        .update({
          quantity: newQuantity,
        })
        .catch((err) =>
          res.status(500).json({
            message: `${locale.translate("errors.production.onUpdate")} ${
              el.id
            }`,
          })
        );
    } else {
      res.status(500).json({
        message: `${locale.translate("errors.production.notExists")} ${el.id}`,
      });
    }
  });
  await Production.create(newProduction)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: locale.translate("errors.production.onCreate") });
    });
};

const remove = async (req, res) => {
  await Production.sync();
  const { id } = req.body;

  const found = await Production.findOne({
    where: { id },
  });

  if (found) {
    const prod = decryptingProduction(found.production);

    prod.forEach(async (el) => {
      const productFounded = await Products.findOne({
        where: { id: el.product },
      });

      const newQuantity = productFounded.quantity - el.quantity;

      if (productFounded) {
        await productFounded
          .update({
            quantity: newQuantity,
          })
          .catch((err) =>
            res.status(500).json({
              message: `${locale.translate("errors.production.onUpdate")} ${
                el.id
              }`,
            })
          );
      } else {
        res.status(500).json({
          message: `${locale.translate("errors.products.notExists")} ${el.id}`,
        });
      }
    });
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
    console.log("produccion no existe!");
    res
      .status(400)
      .json({ message: locale.translate("errors.production.notExists") });
  }
};

const getOne = async (req, res) => {
  const productos = await Products.findAll({
    attributes: ["id", "product"],
  }).then(async (res) => {
    return res.map((el) => {
      return {
        id: el.id,
        name: el.product,
      };
    });
  });

  const { id } = req.params;
  await Production.findOne({
    where: { id },
  }).then(async (production) => {
    if (production) {
      const obj = {};
      obj.id = production.id;
      obj.date = production.date;

      //Cambio de string a numero y creacion de array de objetos de productos
      const prod = production.production;
      const productsById = prod.split(";");
      const productionArray = productsById.map((el) => {
        //Creacion de objeto con id
        const arrayWithId = {
          product: parseInt(el.split(",")[0]),
          quantity: parseInt(el.split(",")[1]),
        };

        return arrayWithId;
      });

      obj.production = productionArray;

      const products = obj.production;

      products.map((element) => {
        const filteredProduct = productos.filter((el) => {
          return el.id === element.product;
        });
        const [{ id, name }] = filteredProduct;
        element.product = {
          id,
          name,
        };
      });

      res.status(200).json({
        data: obj,
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
  remove,
  getOne,
};
