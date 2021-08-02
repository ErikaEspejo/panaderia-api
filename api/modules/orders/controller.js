const { locale } = require("../../../locale");
const Orders = require("./model");
const Products = require("../products/model");
const User = require("../users/model");

const decryptingOrder = (string) => {
  const orderTyped = string.split(";");
  const order = orderTyped.map((el) => {
    const elementSplitted = el.split(",");
    return {
      quantity: parseInt(elementSplitted[0]),
      product: parseInt(elementSplitted[1]),
      cost: parseInt(elementSplitted[2]),
      totalPerProduct: parseInt(elementSplitted[3]),
    };
  });
  return order;
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

  Orders.findAll({
    atributes: [
      "id",
      "buyer",
      "UserIdentificationNumber",
      "order",
      "totalValue",
      "table",
      "createdAt",
    ],
    include: [{ model: User }],
  }).then(async (or) => {
    const order = or;

    /////
    const result = order.map((el) => {
      const buyerSplitted = el.buyer.split(",");
      //Creacion y asignacion de valores en primer nivel *no modificados*
      const obj = {};
      obj.createdAt = el.createdAt;
      obj.id = el.id;
      obj.buyer = {
        id: buyerSplitted[1],
        name: buyerSplitted[0],
      };

      const waiterInfo = el.User;

      obj.waiter = {
        idType: waiterInfo.idType,
        identificationNumber: waiterInfo.identificationNumber,
        name: waiterInfo.name,
        lastName: waiterInfo.lastName,
        username: waiterInfo.username,
        position: waiterInfo.position,
      };

      //Cambio de string a numero y creacion de array de objetos de productos
      const newOrder = el.order;
      const productsById = newOrder.split(";");
      const orderArray = productsById.map((el) => {
        //Creacion de objeto con id
        const arrayWithId = {
          quantity: parseInt(el.split(",")[0]),
          product: parseInt(el.split(",")[1]),
          cost: parseInt(el.split(",")[2]),
          costPerProduct: parseInt(el.split(",")[3]),
        };

        return arrayWithId;
      });

      obj.order = orderArray;

      const products = obj.order;

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

      obj.totalValue = el.totalValue;
      obj.table = el.table;
      return obj;
    });
    res.status(200).json({
      data: result,
    });
  });
};

const create = async (req, res) => {
  await Orders.sync();
  await Products.sync();
  const { buyer, UserIdentificationNumber, order, totalValue, userId, table } =
    req.body;

  const newOrder = {
    buyer,
    UserIdentificationNumber: userId,
    order,
    table,
    totalValue,
  };

  const orderArray = decryptingOrder(order);

  orderArray.forEach(async (el) => {
    const found = await Products.findOne({
      where: { id: el.product },
    });

    const newQuantity = found.quantity - el.quantity;

    if (found) {
      await found
        .update({
          quantity: newQuantity,
        })
        .catch((err) =>
          res.status(500).json({
            message: `${locale.translate("errors.sales.onUpdate")} ${el.id}`,
          })
        );
    } else {
      res.status(500).json({
        message: `${locale.translate("errors.sales.notExists")} ${el.id}`,
      });
    }
  });
  await Orders.create(newOrder)
    .then((created) => {
      res.status(200).json(created);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ message: locale.translate("errors.sales.onCreate") });
    });
};

const remove = async (req, res) => {
  await Orders.sync();
  const { id } = req.body;

  const found = await Orders.findOne({
    where: { id },
  });

  if (found) {
    const order = decryptingOrder(found.order);

    order.forEach(async (el) => {
      const productFounded = await Products.findOne({
        where: { id: el.product },
      });

      const newQuantity = productFounded.quantity + el.quantity;

      if (productFounded) {
        await productFounded
          .update({
            quantity: newQuantity,
          })
          .catch((err) =>
            res.status(500).json({
              message: `${locale.translate("errors.sales.onUpdate")} ${el.id}`,
            })
          );
      } else {
        res.status(500).json({
          message: `${locale.translate("errors.sales.notExists")} ${el.id}`,
        });
      }
    });
    try {
      found.destroy();
      console.log("Borrado correctamente");
      res
        .status(200)
        .json({ message: locale.translate("success.sales.onDelete") });
    } catch (err) {
      res.status(500).json({
        message: `${locale.translate("errors.sales.onDelete")} ${found.id}`,
      });
      console.log("error al eliminar");
    }
  } else {
    console.log("la venta no existe!");
    res
      .status(400)
      .json({ message: locale.translate("errors.sales.notExists") });
  }
};

module.exports = {
  list,
  create,
  remove,
};
