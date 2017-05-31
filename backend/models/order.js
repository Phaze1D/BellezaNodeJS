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
      type: DataTypes.INTEGER(25).UNSIGNED,
      allowNull: false,
      validate: {
        min: 0,
      }
    },
    iva_total: {
      type: DataTypes.INTEGER(25).UNSIGNED,
      allowNull: false,
      validate: {
        min: 0,
      }
    },
    shipping_total: {
      type: DataTypes.INTEGER(25).UNSIGNED,
      allowNull: false,
      validate: {
        min: 0,
      }
    },
    discount_total: {
      type: DataTypes.INTEGER(25).UNSIGNED,
      allowNull: false,
      validate: {
        min: 0,
      }
    },
    total: {
      type: DataTypes.INTEGER(25).UNSIGNED,
      allowNull: false,
      validate: {
        min: 0,
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
      references: {
        model: 'Address',
        key: 'id'
      }
    },
    invoice_address_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      references: {
        model: 'Address',
        key: 'id'
      }
    },
    discount_code_id: {
      type: DataTypes.STRING(45),
      allowNull: true,
      references: {
        model: 'DiscountCode',
        key: 'id'
      }
    },
  }, {
    tableName: 'orders'
  });

  Order.singleOption = function (params) {
    let options = {
      where: {id: params.id, user_id: params.user_id},
      include: [{
        model: sequelize.model('Detail'),
        as: 'details',
        include: [{
          model: sequelize.model('Product'),
          as: 'product',
          attributes: ['id']
        }]
      },{
        model: sequelize.model('Address'),
        as: 'shippingAddress',
      },{
        model: sequelize.model('Address'),
        as: 'invoiceAddress',
      }]
    }

    return options
  }

  Order.userAllOptions = function (query, user_id) {
    let page = query.page ? query.page : 0
    let options = {
      where: {
        user_id: user_id,
      },
      attributes: [
        'id',
        'status',
        'sub_total',
        'iva_total',
        'shipping_total',
        'discount_total',
        'total',
        'created_at'
      ],
      offset: 20 * page,
      limit: 20,
      order: [['created_at', 'DESC']],
      include: [{
        model: sequelize.model('Detail'),
        as: 'details',
        include: [{
          model: sequelize.model('Product'),
          as: 'product',
          attributes: ['id']
        }]
      }]
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
      order: [['created_at', 'DESC']],
      include: [{
        model: sequelize.model('User'),
        as: 'user',
        attributes: ['id', 'first_name', 'last_name']
      }]
    }
    return options
  }

  Order.createOptions = function () {
    let options = {
      fields: [
        'status',
        'sub_total',
        'iva_total',
        'shipping_total',
        'discount_total',
        'total',
        'notes',
        'rfc',
        'razon_social',
        'conekta_id',
        'user_id',
        'discount_code_id',
        'invoice_address_id',
        'shipping_address_id'
      ],
      include: [{
        model: sequelize.model('Detail'),
        as: 'details',
        fields: [
          'name',
          'price',
          'discount',
          'quantity',
          'iva',
          'sub_total',
          'product_id',
          'order_id'
        ]
      },{
        model: sequelize.model('Address'),
        as: 'shippingAddress',
        fields: [
          'first_name',
          'last_name',
          'telephone',
          'street',
          'street2',
          'city',
          'state',
          'zipcode',
          'country'
        ]
      },{
        model: sequelize.model('Address'),
        as: 'invoiceAddress',
        fields: [
          'first_name',
          'last_name',
          'telephone',
          'street',
          'street2',
          'city',
          'state',
          'zipcode',
          'country'
        ]
      }]
    }
    return options
  }

  return Order
};
