/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parent_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'Category',
        key: 'id'
      }
    }
  }, {
    tableName: 'categories'
  });
};
