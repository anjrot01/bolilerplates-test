const express = require("express");
const router = express.Router();
const { getRoles, verifyToken, authPermissions, isOwner } = require("../middlewares");

const UsersControllers = require("../controllers/userController");
const ProductsControllers = require("../controllers/productsControllers");
const RolesControllers = require("../controllers/roleController");
const AuthControllers = require("../controllers/auth/authControllers");

module.exports = () => {
  router.get("/", (req, res) => {
    res.render("home");
  });

  // Auth Routes
  router.post("/auth/register", getRoles, AuthControllers.register);
  router.post("/auth/login", AuthControllers.login);

  //Users Routes
  router.get("/users", verifyToken, authPermissions, UsersControllers.getAllData);
  router.get("/users/:id", verifyToken, authPermissions, UsersControllers.getDataById);
  router.put("/users/:id", verifyToken, isOwner, authPermissions, UsersControllers.updateData);
  router.delete("/users/:id", verifyToken, isOwner, authPermissions, UsersControllers.deleteData);

  //Products Routes
  router.get("/products", ProductsControllers.getAllData);
  router.get("/products/:id", ProductsControllers.getDataById);
  router.put("/products/:id", verifyToken, isOwner, authPermissions, ProductsControllers.updateData);
  router.post("/products", verifyToken, authPermissions, ProductsControllers.createData);
  router.delete("/products/:id", verifyToken, isOwner, authPermissions, ProductsControllers.deleteData);

  //roles Routes
  router.get("/roles", verifyToken, authPermissions, RolesControllers.getAllData);
  router.get("/roles/:id", verifyToken, authPermissions, RolesControllers.getDataById);
  router.put("/roles/:id", verifyToken, authPermissions, RolesControllers.updateData);
  router.post("/roles", verifyToken, authPermissions, RolesControllers.createData);
  router.delete("/roles/:id", verifyToken, authPermissions, RolesControllers.deleteData);

  return router;
};
