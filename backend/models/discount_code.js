/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DiscountCode', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    expires_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    discount: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    is_percentage: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'discount_codes'
  });
};
