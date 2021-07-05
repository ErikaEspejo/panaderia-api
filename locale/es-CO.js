const dictionaryESCO = {
  errors: {
    notAuthorized: "no autorizado",
    notAuthenticated: "no autenticado",
    invalidData: "datos no válidos",
    operationNotAllowed: "Operacion no permitida",
    validate: {
      maxCharactersAllowed: "se excedió el máximo de caracteres",
      emptyData: "datos vacíos",
      invalidUsername: "nombre de usuario no válido",
      invalidName: "nombre inválido",
      invalidEmail: "email inválido",
      passwordsDontMatch: "las contraseñas no coinciden",
      invalidPassword: "contraseña invalida",
      invalidIdType: "tipo de idenficación inválido",
    },
    user: {
      userExists: "usuario actualmente existe",
      userNotExists: "usuario no existe",
      onUpdate: "error al intentar actualizar el usuario",
      onCreate: "error al intentar crear el usuario",
      onDelete: "error al intentar eliminar el usuario",
    },
    quality: {
      onDelete: "error al intentar eliminar el hallazgo",
      exists: "el hallazgo ya existe",
      onCreate: "error al crear el hallazgo",
      onUpdate: "error al actualizar el hallazgo",
      notExists: "el hallazgo no existe",
    },
    costs: {
      onDelete: "error al intentar eliminar el costo",
      exists: "el costo ya existe",
      onCreate: "error al crear el costo",
      onUpdate: "error al actualizar el costo",
      notExists: "el hallazgo no costo",
    },
  },
  success: {
    user: {
      onUpdate: "usuario actualizado correctamente",
      onCreate: "usuario creado exitosamente",
      onUpdate: "usuario actualizado correctamente",
      userDeleted: "usuario eliminado correctamente",
    },
    quality: {
      onCreate: "hallazgo creado correctamente",
      onUpdate: "hallazgo actualizado correctamente",
      onDelete: "hallazgo eliminado correctamente",
    },
    costs: {
      onCreate: "costo creado correctamente",
      onUpdate: "costo actualizado correctamente",
      onDelete: "costo eliminado correctamente",
    },
  },
};

module.exports = { dictionaryESCO };
