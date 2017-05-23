'use strict'
let valmsg =  require('../helpers/validationMessages.js')

module.exports = function(sequelize, DataTypes) {
  const DiscountCode =  sequelize.define('DiscountCode', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
        unique: {
          args: true,
          message: valmsg.email_unique
        },
      }
    },
    expires_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    discount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
        min: {
          args: 0,
          msg: valmsg.min(0)
        },
      }
    },
    is_percentage: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: '1'
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
  }, {
    tableName: 'discount_codes'
  });

  // DiscountCode.belongsTo('User', {as: 'user'});
  return DiscountCode
};
