const dictionaryENUS = {
  errors: {
    notAuthorized: "unauthorized",
    notAuthenticated: "user not authorized",
    invalidData: "invalid data",
    operationNotAllowed: "Operation not allowed",
    validate: {
      maxCharactersAllowed: "max characters exceeded",
      emptyData: "empty data",
      invalidUsername: "invalid username",
      invalidName: "invalid name",
      invalidEmail: "invalid email",
      passwordsDontMatch: "passwords don't match",
      invalidPassword: "invalid password",
      invalidId: "invalid identification",
      invalidIdType: "invalid identification type",
    },
    user: {
      userExists: "user already exists",
      userNotExists: "user not exists",
      onUpdate: "error while updating user",
      onCreate: "error while creating user",
      onDelete: "error while deleted user",
    },
    quality: {
      onDelete: "error while deleted finding",
      exists: "finding already exists",
      onCreate: "error while creating finding",
      onUpdate: "error while updating finding",
      notExists: "finding doesn't exists",
    },
    costs: {
      onDelete: "error while deleted cost",
      exists: "cost already exists",
      onCreate: "error while creating cost",
      onUpdate: "error while updating cost",
      notExists: "cost doesn't exists",
    },
  },
  success: {
    user: {
      onUpdate: "user updated successfully",
      onCreate: "user created successfully",
      onUpdate: "user updated successfully",
      onDelete: "user removed successfully",
    },
    quality: {
      onCreate: "finding created successfully",
      onUpdate: "finding updated successfully",
      onDelete: "finding removed successfully",
    },
    costs: {
      onCreate: "cost created successfully",
      onUpdate: "cost updated successfully",
      onDelete: "cost removed successfully",
    },
  },
};

module.exports = { dictionaryENUS };
