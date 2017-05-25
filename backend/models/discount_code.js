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
      unique: {
        args: true,
        message: 'Codigo Invalido'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
        isUnique: (value, next) => {
          DiscountCode.findOne({where: {code: value}})
          .then( (discountCode) => {
            if(discountCode){
              throw new Error('Codigo Invalido')
            }
            return next();
          }).catch(next);
        }
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
        isDate: true
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
          args: 1,
          msg: valmsg.min(1)
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
