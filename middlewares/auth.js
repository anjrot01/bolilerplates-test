const { virifyJWT, permissions } = require("../helpers");
const UserModels = require("../models/Users");
const ProductsModels = require("../models/Products");

exports.verifyToken = async (req, res, next) => {
  // definir como viene el token y obternerlo
  if (!req.headers.authorization) return res.status(401).send("No token provided");
  const token = req.headers.authorization.replace(/^Bearer\s+/, "");
  try {
    // verificar q el token sea valido
    const verify = virifyJWT(token);

    // buscamos el usuario por el id y lo vamos a integrar en el req.body
    const user = await UserModels.findById(verify.id, { password: 0 }).populate("roles");
    if (!user) return res.status(401).send("User does not exists");

    req.body.user = user;

    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.authPermissions = async (req, res, next) => {
  const { roles, permissions: perms, isOwner } = req.body.user;
  if (isOwner) {
    console.log("isOwner desde authPermission :>> ", isOwner);
    return next();
  }

  const { method, path } = req;

  const scope = path.split("/");

  const fidnPermissions = permissions.find(x => x.method === method);

  const methodPermissions = [...fidnPermissions.permissions, `${scope[1]}_${fidnPermissions.scope}`];

  const getPermissions = perms && perms.length !== 0 ? [perms] : roles.map(x => x.permissions);

  let count = 0;

  for (const assignPermissions of getPermissions) {
    for (const compare of methodPermissions) {
      if (assignPermissions.includes(compare)) {
        count++;
      }
    }
  }

  if (count === 0) return res.status(401).send("unauthorized!!");

  next();
};

exports.isOwner = async (req, res, next) => {
  const { id } = req.body.user;
  console.log("_id :>> ", id);
  const { method, path } = req;
  console.log("method :>> ", method);

  const scope = path.split("/");
  console.log("user :>> ", scope);

  switch (method) {
    case "PUT":
    case "DELETE":
      if (scope[1] === "products") {
        try {
          const productOwner = await ProductsModels.findOne({ _id: scope[2], productOwner: id });
          if (productOwner !== null) {
            req.body.user.isOwner = true;
            return next();
          }
        } catch (error) {
          console.log("error.message :>> ", error.message);
        }
      }
      if (scope[1] === "users") {
        if (id === scope[2]) {
          req.body.user.isOwner = true;
          return next();
        }
      }

    default:
      break;
  }

  next();
};
