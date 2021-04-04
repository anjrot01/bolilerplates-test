const bcrypt = require("bcryptjs");

/**
 * Encrypt passwor
 * @param {String} password - User Password
 * @returns Password encrypted
 */
exports.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

/**
 * Decrypt Passwor
 * @param {String} password - User Password
 * @returns Password encrypted
 */
exports.decryptPassword = async (password, comparePassword) => {
  return await bcrypt.compare(password, comparePassword);
};
