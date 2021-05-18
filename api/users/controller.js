const jwt = require("jsonwebtoken");
const { Sequelize } = require('sequelize');
const bcrypt = require("bcrypt");
const { locale } = require("../../locale");
const { config } = require("../../config");

const User = require("./model");

const Op = Sequelize.Op;

const list = async (req, res) => {

  User.findAll(
    {
      where: {
        //state: true,
      },
      attributes: [
        "name",
        "lastname",
        "identificationNumber",
        "username",
        "position",
        "state",
        "createdAt",
        "updatedAt"
      ]
    })
    .then(async (users) => {
      res.status(200).json({
        data: users,
      });
    })
}

const create = async (req, res) => {

  await User.sync();
  const { identificationNumber, name, lastName, username, state, position, email, password } = req.body;

  const findUser = await User.findOne({
    where: {
      [Op.or]: [{ identificationNumber }, { username }, { email }]
    }
  });

  if (findUser) {
    res
      .status(500)
      .json({ message: locale.translate("errors.user.userExists") });
    return;
  }

  const user = {
    identificationNumber,
    name,
    lastName,
    username,
    state,
    position,
    email,
    password
  };

  await User.create(user)
    .then((userCreated) => {
    res.status(200).json(userCreated);
  }).catch(err => {
    res.status(400).
    json({ message: locale.translate("errors.user.onCreate") });
  })
};

const update = async (req, res) => {
  await User.sync();
  const identificationNumber = req.params.identificationNumber;
  const { name, lastName, username, state, email, password, position } = req.body;

  if (name && lastName && username && email && password && position && state) {
    const user = {
      name,
      lastName,
      username,
      state,
      email,
      password,
      position
    };

    const userFound = await User.findOne({
      where: { identificationNumber }
    });

    if (userFound) {
      await userFound.update(
        {
          name: user.name,
          lastName: user.lastName,
          state: user.state,
          email: user.email,
          username: user.username,
          password: user.password,
          position: user.position,
        }
      ).then(() =>
        res.status(204).json({
          message: locale.translate("success.user.onUpdate"),
        })
      ).catch(err =>
        res.status(500).json({
          message: `${locale.translate("errors.user.onUpdate")} ${identificationNumber}`,
        })
      )

    } else {
      res.status(500).json({
        message: `${locale.translate("errors.user.userNotExists")} ${identificationNumber}`,
      });
    }

  } else {
    res.status(500).json({ message: locale.translate("errors.invalidData") });
  }
};

const remove = async (req, res) => {
  await User.sync();
  const { identificationNumber } = req.body;

  const userFound = await User.findOne({
    where: { identificationNumber }
  });

  if(userFound){
    try {
      userFound.destroy()
      console.log("Borrado correctamente");
      res
        .status(200)
        .json({ message: locale.translate("success.user.onDelete") });

    }
    catch(err) {
      res.status(500).json({
        message: `${locale.translate("errors.user.onDelete")} ${userFind.username
          }`,
      });
    }
  } else {
    console.log("usuario no existe!");
    res
      .status(400)
      .json({ message: locale.translate("errors.user.userNotExists") });
  }
};

module.exports = {
  list,
  create,
  update,
  remove
};
