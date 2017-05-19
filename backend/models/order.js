/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order', {
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
      allowNull: false
    },
    iva_total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    shipping_total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    discount_total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false
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
};
