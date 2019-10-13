'use strict';
module.exports = (sequelize, DataTypes) => {
  const measurements = sequelize.define('measurements', {
    userId: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    height: DataTypes.DECIMAL,
    bp: DataTypes.STRING,
    heartrate: DataTypes.INTEGER
  }, {});
  measurements.associate = function(models) {
    // associations can be defined here
  };
  return measurements;
};