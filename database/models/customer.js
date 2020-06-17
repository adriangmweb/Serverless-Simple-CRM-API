'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {});
  Customer.associate = function(models) {
    Customer.belongsTo(models.User, {
      foreignKey: 'createdBy'
    });
    Customer.belongsTo(models.User, {
      foreignKey: 'updatedBy'
    });
  };
  return Customer;
};