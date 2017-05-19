/* jshint indent: 2 */
var valmsg =  require('../helpers/validationMessages.js')

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
      unique: {
        args: true,
        message: valmsg.email_unique
      },
      validate: {
        isEmail: {
          args: true,
          msg: valmsg.email
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
        max: {
          args: 125,
          msg: valmsg.max(125)
        }
      }
    },
    active: {
      type: DataTypes.BOOLEAN(),
      allowNull: false
    }
  }, {
    tableName: 'mailing'
  });
};
