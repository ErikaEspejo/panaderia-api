const User = require("../users/model");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const isAdmin = async (userId) => {
  try {
    const userFound = await User.findOne({
      where: { identificationNumber: userId, position: "admin" },
    });

    if (userFound) {
      console.log("userFounded");
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

module.exports = { isAdmin };
