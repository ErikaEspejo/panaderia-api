const { isAdmin } = require("../services/userService");
const { locale } = require("../../locale");

const usersAuthorization = async (req, res, next) => {
  const id = req.params.id || req.body.identificationNumber;
  const { userId } = req.body;
  const isUserAdmin = await isAdmin(userId);

  if (userId === id || isUserAdmin) {
    next();
  } else {
    res
      .status(403)
      .json({ message: locale.translate("errors.operationNotAllowed") });
  }
};

module.exports = { usersAuthorization };
