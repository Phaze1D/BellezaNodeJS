/* jshint indent: 2 */
var valmsg =  require('../helpers/validationMessages.js')

module.exports = function(sequelize, DataTypes) {


  const Category =  sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
        max: {
          args: 0,
          msg: valmsg.max(60)
        },
      }
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

  return Category
};
