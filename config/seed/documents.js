exports.roles = [
  {
    name: "admin",
    permissions: ["admin_granted"]
  },
  {
    name: "user",
    permissions: ["products_read"]
  },
  {
    name: "manager",
    permissions: ["products_read", "products_write", "products_update", "users_read"]
  },
  {
    name: "customer",
    permissions: ["products_read"]
  }
];

exports.adminUser = {
  name: "admin",
  lastName: "admin",
  email: "admin@anjrot.com",
  password: "123456"
};
