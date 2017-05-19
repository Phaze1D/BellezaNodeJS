/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    plu: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    volume: {
      type: DataTypes.STRING(32),
      allowNull: true
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
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    iva: {
      type: DataTypes.INTEGER(10),
      allowNull: false
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
};
