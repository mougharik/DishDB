'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define('Dish', {
    dName: DataTypes.STRING,
    ingredient: DataTypes.STRING,
    price: DataTypes.FLOAT,
    dRating: DataTypes.INTEGER
  }, {});
  Dish.associate = function(models) {
    Dish.belongsTo(models.Restaurant);
  };
  return Dish;
};