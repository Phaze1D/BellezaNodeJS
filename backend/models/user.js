/* jshint indent: 2 */
var valmsg =  require('../helpers/validationMessages.js')
var Sequelize = require('sequelize');


module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(125),
      allowNull: false,
      unique: {
        args: true,
        message: valmsg.email_unique
      },
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
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        min: {
          args: 6,
          msg: valmsg.min(6)
        },
        max: {
          args: 255,
          msg: valmsg.max(255)
        }
      }
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        max: {
          args: 45,
          msg: valmsg.max(45)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        max: {
          args: 45,
          msg: valmsg.max(45)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    telephone: {
      type: DataTypes.STRING(45),
      allowNull: true,
      validate: {
        max: {
          args: 45,
          msg: valmsg.max(45)
        },
        phone(value){
          valmsg.phone(value)
        }
      }
    },
    admin: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'users'
  });

  // User.hasMany('Order', {as: 'orders'})
  // User.hasMany('Address', {as: 'addresses'})
  // User.hasMany('DiscountCode', {as: 'discountCodes'})
  return User
};
