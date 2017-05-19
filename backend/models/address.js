/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Address', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    telephone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    street: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    street2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    zipcode: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: 'Mexico'
    },
    user_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'addresses'
  });
};
