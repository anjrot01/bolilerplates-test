module.exports = {
  /**
   * Get All data from a model
   *
   * @async
   * @param {Object} model
   * @returns {Object} Data Created
   */
  find: async model => {
    try {
      const data = await model.find();

      return data;
    } catch (error) {
      throw error.message;
    }
  },

  /**
   * Get data by ID
   * @param {Object} model
   * @returns {Object} Data by Id
   */
  findById: async (model, id) => {
    try {
      const data = await model.findOne({ _id: id });

      return data;
    } catch (error) {
      throw error.message;
    }
  },

  /**
   * Create data
   * @param {Object} model
   * @returns {Object} Data crteated
   */
  create: async (model, body) => {
    try {
      const data = new model(body);

      const dataCreated = await data.save();

      return dataCreated;
    } catch (error) {
      throw error.message;
    }
  },

  /**
   * Update data by ID
   * @param {Object} model
   * @returns {Object} Data Updated
   */
  update: async (model, body, id) => {
    try {
      const data = await model.findByIdAndUpdate(id, body, { new: true });

      return data;
    } catch (error) {
      throw error.message;
    }
  },

  /**
   * Delete data by ID
   * @param {Object} model
   * @returns {String} Message
   */
  erase: async (model, id) => {
    try {
      await model.findByIdAndDelete(id);

      return "La data fue borrada correctamente!!!";
    } catch (error) {
      throw error.message;
    }
  }
};
