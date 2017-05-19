/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Detail', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    iva_total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    sub_total: {
      type: DataTypes.DECIMAL,
      allowNull: false
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
};
