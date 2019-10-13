'use strict';

module.exports = (sequelize, DataTypes) => {

  const doctor = sequelize.define('doctor', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    npi: DataTypes.STRING,
    specialty: DataTypes.STRING
  }, {});

  doctor.associate = function(models) {
    // associations can be defined here
    // models.doctor.hasOne(models.patient)
  };

  return doctor;
};