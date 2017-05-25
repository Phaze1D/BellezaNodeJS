'use strict'
let valmsg =  require('../helpers/validationMessages.js')

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
    code_used: {
      type: DataTypes.STRING(45),
      allowNull: true
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

  Order.userAllOptions = function (query, user_id) {
    let page = query.page ? query.page : 0
    let options = {
      where: {
        user_id: user_id,
      },
      offset: 20 * page,
      limit: 20
    }
    return options
  }

  Order.allOptions = function (query) {
    let page = query.page ? query.page : 0
    let options = {
      where: {
        status: query.status,
      },
      offset: 20 * page,
      limit: 20,
      include: [{
        model: sequelize.model('User'),
        as: 'user',
        attributes: ['id', 'first_name', 'last_name']
      }]
    }
    return options
  }

  return Order
};
