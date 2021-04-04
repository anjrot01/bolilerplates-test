const jwt = require("jsonwebtoken");
require("dotenv").config();

const secrect = process.env.JWT_SECRECT;

exports.createToken = id => jwt.sign({ id }, secrect, { expiresIn: "1 day" });

exports.virifyJWT = token => jwt.verify(token, secrect);
