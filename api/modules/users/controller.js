const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const { locale } = require("../../../locale");
const { config } = require("../../../config");

const User = require("./model");

const Op = Sequelize.Op;

const list = async (req, res) => {
  User.findAll({
    where: {
      //state: true,
    },
    attributes: [
      "idType",
      "name",
      "lastname",
      "identificationNumber",
      "username",
      "position",
      "state",
      "email",
      "createdAt",
      "updatedAt",
    ],
  }).then(async (users) => {
    res.status(200).json({
      data: users,
    });
  });
};

const create = async (req, res) => {
  await User.sync();
  const {
    idType,
    identificationNumber,
    name,
    lastName,
    username,
    state,
    position,
    email,
    password,
  } = req.body;

  const salt = bcrypt.genSaltSync(config.saltRounds);
  const passwordHash = bcrypt.hashSync(password, salt);

  const findUser = await User.findOne({
    where: {
      [Op.or]: [{ identificationNumber }, { username }, { email }],
    },
  });

  if (findUser) {
    res
      .status(500)
      .json({ message: locale.translate("errors.user.userExists") });
    return;
  }

  const user = {
    idType,
    identificationNumber,
    name,
    lastName,
    username,
    state,
    position,
    email,
    password: passwordHash,
  };

  await User.create(user)
    .then((userCreated) => {
      res.status(200).json(userCreated);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: locale.translate("errors.user.onCreate") });
    });
};

const update = async (req, res) => {
  await User.sync();
  const identificationNumber = req.params.identificationNumber;
  const { idType, name, lastName, username, state, email, password, position } =
    req.body;

  const salt = bcrypt.genSaltSync(config.saltRounds);
  const passwordHash = bcrypt.hashSync(password, salt);

  if (
    (idType,
    name && lastName && username && email && password && position && state)
  ) {
    const user = {
      idType,
      name,
      lastName,
      username,
      state,
      email,
      password: passwordHash,
      position,
    };

    const userFound = await User.findOne({
      where: { identificationNumber },
    });

    if (userFound) {
      await userFound
        .update({
          idType: user.idType,
          name: user.name,
          lastName: user.lastName,
          state: user.state,
          email: user.email,
          username: user.username,
          password: user.password,
          position: user.position,
        })
        .then(() =>
          res.status(204).json({
            message: locale.translate("success.user.onUpdate"),
          })
        )
        .catch((err) =>
          res.status(500).json({
            message: `${locale.translate(
              "errors.user.onUpdate"
            )} ${identificationNumber}`,
          })
        );
    } else {
      res.status(500).json({
        message: `${locale.translate(
          "errors.user.userNotExists"
        )} ${identificationNumber}`,
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
    where: { identificationNumber },
  });

  if (userFound) {
    try {
      userFound.destroy();
      console.log("Borrado correctamente");
      res
        .status(200)
        .json({ message: locale.translate("success.user.onDelete") });
    } catch (err) {
      res.status(500).json({
        message: `${locale.translate("errors.user.onDelete")} ${
          userFind.username
        }`,
      });
      console.log("error al eliminar");
    }
  } else {
    console.log("usuario no existe!");
    res
      .status(400)
      .json({ message: locale.translate("errors.user.userNotExists") });
  }
};

const getUser = async (req, res) => {
  const { identificationNumber } = req.params;
  await User.findOne({
    where: { identificationNumber },
    attributes: [
      "idType",
      "name",
      "lastname",
      "identificationNumber",
      "username",
      "position",
      "state",
      "createdAt",
      "updatedAt",
    ],
  }).then(async (user) => {
    if (user) {
      res.status(200).json({
        data: user,
      });
    } else {
      res
        .status(400)
        .json({ message: locale.translate("errors.user.userNotExists") });
    }
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const userFound = await User.findOne({
    where: { username },
    attributes: [
      "password",
      "username",
      "identificationNumber",
      "position",
      "name",
      "lastName",
    ],
  });
  if (userFound) {
    // eslint-disable-next-line no-underscore-dangle
    const userId = userFound.identificationNumber;

    const result = await bcrypt.compare(password, userFound.password);
    if (result) {
      const token = jwt.sign({ userId }, config.jwtKey);
      const cookieProps = {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      };

      res
        .status(200)
        .cookie("token", token, cookieProps)
        .json({
          data: {
            id: userId,
            username: userFound.username,
            name: userFound.name,
            lastName: userFound.lastName,
            token: token,
            position: userFound.position,
          },
          message: "ok",
        });
    } else {
      res.json({ message: locale.translate("errors.user.userNotExists") });
    }
  } else {
    res.json({ message: locale.translate("errors.user.userNotExists") });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").json({ message: "ok" });
};

module.exports = {
  list,
  create,
  update,
  remove,
  getUser,
  login,
  logout,
};
