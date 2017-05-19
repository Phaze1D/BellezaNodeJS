/* jshint indent: 2 */
var valmsg =  require('../helpers/validationMessages.js')

module.exports = function(sequelize, DataTypes) {
  const Address = sequelize.define('Address', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    street: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        max: {
          args: 255,
          msg: valmsg.max(255)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    street2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        max: {
          args: 60,
          msg: valmsg.max(60)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    state: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        max: {
          args: 60,
          msg: valmsg.max(60)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    zipcode: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        max: {
          args: 60,
          msg: valmsg.max(60)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    country: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: 'Mexico'
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'addresses'
  });


  Address.belongsTo('User', {as: 'user'});
  Address.hasMany('Order', {as: 'orderShip', foreignKey: 'shipping_address_id'});
  Address.hasMany('Order', {as: 'orderInvoice', foreignKey: 'invoice_address_id'});
  return Address
};
