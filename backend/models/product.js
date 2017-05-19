/* jshint indent: 2 */
var valmsg =  require('../helpers/validationMessages.js')

module.exports = function(sequelize, DataTypes) {
  const Product =  sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    plu: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: unique: {
        args: true,
        message: valmsg.plu_unique
      },
      validate: {
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        max: {
          args: 125,
          msg valmsg.max(125)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    volume: {
      type: DataTypes.STRING(32),
      allowNull: true,
      validate: {
        max: {
          args: 32,
          msg valmsg.max(32)
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    benefits: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    discount: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      validate:{
        max: {
          args: 100,
          msg valmsg.max(100)
        }
      }
    },
    iva: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      validate:{
        max: {
          args: 100,
          msg valmsg.max(100)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    stock: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    active: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'products'
  });

  Product.hasMany('Detail', {as: 'details'})
  Product.belongsToMany('Category', { as: 'categories', through: 'category_product'})
  return Product
};
