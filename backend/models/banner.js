'use strict'

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Banner', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    link_to: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    manual_active: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: '0'
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'banners'
  });
};
