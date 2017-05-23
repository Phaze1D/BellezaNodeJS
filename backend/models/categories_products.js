'use strict'

module.exports = function(sequelize, DataTypes) {
  const CategoriesProducts =  sequelize.define('CategoriesProducts', {
    categories_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'id'
      }
    },
    products_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
  }, {
    tableName: 'categories_has_products'
  });


  return CategoriesProducts
};
