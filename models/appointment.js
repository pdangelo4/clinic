'use strict';

module.exports = (sequelize, DataTypes) => {

    const Appointment = sequelize.define(
        'appointment',
        {
            patientId: DataTypes.INTEGER,
            scheduleStart: DataTypes.DATE,
            scheduleEnd: DataTypes.DATE,
            title: DataTypes.STRING,
            status: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {}
    );

    Appointment.associate = function(models) {
        // associations can be defined here
    };
    
    return Appointment;
};
