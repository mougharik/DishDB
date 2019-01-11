'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    rName: DataTypes.STRING,
    address: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    openHours: DataTypes.TIME,
    closeHours: DataTypes.TIME,
    rRating: DataTypes.INTEGER
  }, {});
  Restaurant.associate = function(models) {
    Restaurant.hasMany(models.Dish);
  };
  return Restaurant;
};