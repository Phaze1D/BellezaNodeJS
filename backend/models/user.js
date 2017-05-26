'use strict'
let valmsg =  require('../helpers/validationMessages.js')
let Sequelize = require('sequelize');
var bcrypt = require('bcryptjs')



module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(125),
      allowNull: false,
      unique: {
        args: true,
        message: valmsg.email_unique
      },
      validate: {
        len: {
          args: [1, 125],
          msg: valmsg.len(1, 125)
        },
        isEmail: {
          args: true,
          msg: valmsg.email
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
        isUnique: (value, next) => {
          User.findOne({where: {email: value}})
          .then( (user) => {
            if(user){
              throw new Error(valmsg.email_unique)
            }
            return next();
          }).catch(next);
        }
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: valmsg.len(6, 255)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        len: {
          args: [1, 45],
          msg: valmsg.len(1, 45)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        len: {
          args: [1, 45],
          msg: valmsg.len(1, 45)
        },
        notEmpty: {
          args: true,
          msg: valmsg.required
        },
      }
    },
    telephone: {
      type: DataTypes.STRING(45),
      allowNull: true,
      validate: {
        len: {
          args: [1, 45],
          msg: valmsg.len(1, 45)
        },
        phone(value){
          valmsg.phone(value)
        }
      }
    },
    preferences: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: true
    },
    admin: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false
    },
    password_reset_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password_reset_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW
    },
    conekta_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'users'
  });

  User.beforeCreate((user, options, cb) => {
    bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash
      return cb(null, options)
    })
  });

  User.loginOptions = function (email) {
    return {
      where: {email: email},
      include: [{
        model: sequelize.model('Address'),
        as: 'addresses',
      }]
    }
  }


  return User
};
