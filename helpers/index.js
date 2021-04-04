const { encryptPassword, decryptPassword } = require("./encryptPass");
const { createToken, virifyJWT } = require("./jwt");
const { permissions } = require("./permissions");

module.exports = {
  encryptPassword,
  decryptPassword,
  createToken,
  virifyJWT,
  permissions
};
