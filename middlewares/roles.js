const RolesModels = require("../models/roles");

exports.getRoles = async (req, res, next) => {
  // revisar si existe un rol y sino role "user" por default
  const { roles, permissions } = req.body;
  const role = roles && roles.length !== 0 ? roles : ["user"];

  // si hay rol buscamos si existe en bd y sino return
  try {
    const findRole = await RolesModels.find({ name: { $in: role } });
    if (findRole.length === 0) return res.status(404).send("Role not found");

    req.body.roles = findRole.map(x => x._id);

    // siga al controlador
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
