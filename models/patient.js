'use strict';


const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define('patient', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    admin: DataTypes.BOOLEAN,
    profile: DataTypes.TEXT,
    ssn: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {hooks: {
    beforeCreate: (pendingUser) => {
      //encryption with BCrypt
      if (pendingUser && pendingUser.password) {
        
        let hash = bcrypt.hashSync(pendingUser.password, 12);

        pendingUser.password = hash;
      }
    }
  }});
  
  patient.associate = function(models) {
    // associations can be defined here
  };

  patient.prototype.validPassword = function(typedInPassword) {

    return bcrypt.compareSync(typedInPassword, this.password);
  }

  return patient;
};