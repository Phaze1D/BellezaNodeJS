"use strict"
let valmsg =  require("../helpers/validationMessages.js")

module.exports = function(sequelize, DataTypes) {
	let Mailing = sequelize.define("Mailing", {
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
				len: {
					args: [1, 125],
					msg: valmsg.len(1, 125)
				},
			}
		},
		active: {
			type: DataTypes.BOOLEAN(),
			allowNull: false
		}
	}, {
		tableName: "mailing"
	})

	Mailing.backOfficeAll = function (page, prePage) {
		return this.findAndCountAll({offset: prePage*page, limit: prePage})
	}

	Mailing.findByEmail = function (email) {
		return this.findOne({where: {email: email}})
	}

	return Mailing
}
