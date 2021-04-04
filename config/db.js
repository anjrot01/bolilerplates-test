const mongoose = require("mongoose");
require("dotenv").config();

const dbPath = process.env.DB_PATH;

const db = async () => {
  console.log("dbPath :>> ", dbPath);
  try {
    await mongoose.connect(dbPath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log(`Conectado a la db ${dbPath}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

db();

module.exports = db;
