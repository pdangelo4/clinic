'use strict';

module.exports = (sequelize, DataTypes) => {
    const chat = sequelize.define(
        'chat',
        {
            from: DataTypes.INTEGER,
            to: DataTypes.INTEGER,
            message: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {}
    );
    chat.associate = function(models) {
        // associations can be defined here
    };
    
    return chat;
};
