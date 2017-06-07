'use strict'

module.exports = function(sequelize, DataTypes) {
  let Banner = sequelize.define('Banner', {
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
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true
      }
    }
  }, {
    tableName: 'banners'
  });

  Banner.carouselImages = function () {
    return {
      where: {
        $or : [{
          manual_active: true,
        }, {
          start_date: {$lt: Date.now()},
          end_date: {$gt: Date.now()},
        }]
      }
    }
  }

  return Banner
};
