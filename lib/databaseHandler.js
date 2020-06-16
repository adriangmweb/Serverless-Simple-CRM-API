const db = require('../database/models');

class databaseHandler {
  constructor(){}
  /**
   * Initializes database connection
   */
  async init() {
    await db.sequelize.authenticate();
  }

  /**
   * Look for one records in database
   * @param {String} model Database Model Name
   * @param {Object} condition Conditions for filtering records
   * @param {Object} format Response format, full record by default
   *
   * @returns found single record
   */
  async findOne(model, condition = {include: {all: true}}, format = {plain: true}) {
    return db[model].findOne(condition)
      .then(device => (device) ? device.get(format) : device);
  }

  /**
   * Look for all records in database
   * @param {String} model Database Model Name
   * @param {Object} condition Conditions for filtering records
   * @param {Object} format Response format, full record by default
   *
   * @returns Array dataset of records
   */
  async findAll(model, condition = {include: {all: true}}, format = {plain: true}) {
    return db[model].findAll(condition)
      .then(devices => devices.map(device => device.get(format)));
  }

  /**
   * Search or create a record in the Database if doesn't exists
   * @param {String} model Database Model Name
   * @param {Object} condition Conditions for filtering records
   * @param {Object} format Response format, full record by default
   *
   * @returns Record found or created
   */
  async findOrCreate(model, condition = {}, format = {plain: true}) {
    return db[model].findOrCreate(condition)
      .then(records => records.reduce(record => record.get(format)));
  }

  /**
   * Creates a new record in the Database
   * @param {String} model Database Model Name
   * @param {Object} record Record to create
   * @param {Object} include Related models to include, all by default
   *
   * @returns New record
   */
  async create(model, record = {}, include = [{all: true}]) {
    return db[model].create(record, { include: include });
  }

  /**
   * Updates a record in the Database
   * @param {String} model Database Model Name
   * @param {Object} attr Attributes to update
   * @param {Object} condition Conditions for filtering records
   *
   * @returns True or false
   */
  async update(model, attr = {}, condition = {}) {
    return this.getModel(model).update(attr, condition);
  }

  /**
   * Deletes a record in the Database
   * @param {String} model Database Model Name
   * @param {Object} condition Conditions for filtering records to delete
   *
   * @returns True or false
   */
  async remove(model, condition = {}) {
    return this.getModel(model).destroy(condition);
  }

  /**
   * Returns database model if exists
   * @param {String} model Database model name
   *
   * @returns Database model
   */
  getModel(model) {
    return db[model]
  }

  /**
   * Returns operator for query comparisons
   * @param {String} operator Sequelize operator key
   *
   * @returns Sequelize operator
   */
  getOperator(operator){
    return db.Sequelize.Op[operator]
  }
}
module.exports = databaseHandler;