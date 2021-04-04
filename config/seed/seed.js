require("../db");
const UsersModel = require("../../models/Users");
const RolesModel = require("../../models/roles");
const { adminUser, roles } = require("./documents");
const { create } = require("../../helpers/crud");
const { encryptPassword } = require("../../helpers");

const createAdminUser = async roleId => {
  const userPass = await encryptPassword(adminUser.password);
  adminUser.password = userPass;
  adminUser.roles = [roleId];
  return await create(UsersModel, adminUser);
};

(async () => {
  //revisar la bd si hay roles

  // sino existen crearlos

  // creamos el usario admin y salir
  try {
    const findRoles = await RolesModel.find();
    if (findRoles.length !== 0) {
      console.log("Ya existen datos en Bd!!!");
      process.exit();
    }

    for (const seedRoles of roles) {
      const createRoles = await create(RolesModel, seedRoles);
      console.log("Role creado!! :>> ", createRoles);
    }
    const adminRole = await RolesModel.findOne({ name: "admin" });
    const admin = await createAdminUser(adminRole._id);
    console.log("User admin creado:>> ", admin);
    process.exit();
  } catch (error) {
    console.log("error :>> ", error);
    process.exit();
  }
})();
// none
