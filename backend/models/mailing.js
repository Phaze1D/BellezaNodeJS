/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mailing', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    active: {
      type: DataTypes.BOOLEAN(),
      allowNull: false
    }
  }, {
    tableName: 'mailing'
  });
};
