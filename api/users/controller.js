const jwt = require("jsonwebtoken");
const { Sequelize } = require('sequelize');
const bcrypt = require("bcrypt");
const { locale } = require("../../locale");
const { config } = require("../../config");

const User = require("./model");

const Op = Sequelize.Op;


/* const list = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  User.find({ active: true }, ["name", "username", "createdAt", "updatedAt"])
    .limit(Number(limit))
    .skip(skip)
    .sort({ createdAt: -1 })
    .then(async (users) => {
      const total = await User.estimatedDocumentCount();
      const totalPages = Math.ceil(total / limit);
      const hasMore = page < totalPages;

      res.status(200).json({
        hasMore,
        totalPages,
        total,
        data: users,
        currentPage: page,
      });
    });
}; */

const create = async (req, res) => {

  await User.sync();
  const { identificationNumber, name, lastName, username, state, position, email, password } = req.body;

  const findUser = await User.findAll({
    where: {
      [Op.or]: [{ identificationNumber }, { username }]
    }
  });

  if (findUser.length > 0) {
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


module.exports = {
  create
};
