'use strict'
let valmsg =  require('../helpers/validationMessages.js')
let Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PasswordReset', {
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: valmsg.email
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
        max: {
          args: 125,
          msg: valmsg.max(125)
        }
      }
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  }, {
    tableName: 'password_resets'
  });
};
