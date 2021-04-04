const { find, findById, create, update, erase } = require("../helpers/crud");
const Model = require("../models/Products");

/**
 * Controller Get All Products Controller
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} All products
 */
exports.getAllData = async (req, res) => {
  try {
    const data = await find(Model);

    res.json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * Controller Get a product by Id
 * @param {Object} req - HTTP req
 * @param {Object} res - HTTP res
 * @returns {Object} Product by id
 */
exports.getDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await findById(Model, id);
    if (req.headers["content-type"] && req.headers["content-type"] === "application/json") {
      return res.json(data);
    }

    res.render("product", {
      title: data.title,
      sku: data.sku
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * Controller Create Product
 * @param {Object} req - HTTP req
 * @param {Object} res - HTTP res
 * @returns {Object} Product Created
 */
exports.createData = async (req, res) => {
  const { _id } = req.body.user;
  req.body.productOwner = _id;
  try {
    const data = await create(Model, req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await update(Model, req.body, id);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await erase(Model, id);

    res.send(deleteData);
  } catch (error) {
    res.status(400).send(error);
  }
};
