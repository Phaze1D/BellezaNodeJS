'use strict'
let valmsg =  require('../helpers/validationMessages.js')

module.exports = function(sequelize, DataTypes) {
  const Detail =  sequelize.define('Detail', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: {
          args: 0,
          msg: valmsg.min(0)
        },notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    quantity: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: valmsg.min(1)
        },notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    iva_total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: {
          args: 0,
          msg: valmsg.min(0)
        },notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    sub_total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: {
          args: 0,
          msg: valmsg.min(0)
        },notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    order_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'Order',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'id'
      }
    }
  }, {
    tableName: 'details'
  });

  return Detail
};
