/* jshint indent: 2 */
var valmsg =  require('../helpers/validationMessages.js')

module.exports = function(sequelize, DataTypes) {
  const Order =  sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    sub_total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: {
          args: 0,
          msg: valmsg.min(0)
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
        },
      }
    },
    shipping_total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: {
          args: 0,
          msg: valmsg.min(0)
        },
      }
    },
    discount_total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: {
          args: 0,
          msg: valmsg.min(0)
        },
      }
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: {
          args: 0,
          msg: valmsg.min(0)
        },
      }
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rfc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    razon_social: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    conekta_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tracking_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    shipping_address_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'Address',
        key: 'id'
      }
    },
    invoice_address_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'Address',
        key: 'id'
      }
    }
  }, {
    tableName: 'orders'
  });

  Order.belongsTo('User', {as: 'user'});
  Order.belongsTo('Address', {as: 'shippingAddress', foreignKey: 'shipping_address_id'});
  Order.belongsTo('Address', {as: 'invoiceAddress', foreignKey: 'invoice_address_id'});
  Order.hasMany('Detail', {as: 'details'})
  return Order
};
