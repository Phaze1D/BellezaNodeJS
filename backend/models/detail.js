"use strict"
let valmsg =  require("../helpers/validationMessages.js")

module.exports = function(sequelize, DataTypes) {
	const Detail = sequelize.define("Detail", {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: valmsg.required
				},
			}
		},
		price: {
			type: DataTypes.INTEGER(25).UNSIGNED,
			allowNull: false,
			validate: {
				min: 0,
				notEmpty: {
					args: true,
					msg: valmsg.required
				},
			}
		},
		discount: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			defaultValue: "0",
			validate:{
				max: {
					args: 100,
					msg: valmsg.max(100)
				}
			}
		},
		quantity: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			validate: {
				min: 0,
				notEmpty: {
					args: true,
					msg: valmsg.required
				},
			}
		},
		iva: {
			type: DataTypes.INTEGER(25).UNSIGNED,
			allowNull: false,
			validate: {
				min: 0,
				notEmpty: {
					args: true,
					msg: valmsg.required
				},
			}
		},
		sub_total: {
			type: DataTypes.INTEGER(25).UNSIGNED,
			allowNull: false,
			validate: {
				min: 0,
				notEmpty: {
					args: true,
					msg: valmsg.required
				},
			}
		},
		order_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: "Order",
				key: "id"
			}
		},
		product_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: "Product",
				key: "id"
			}
		}
	}, {
		tableName: "details"
	})

	return Detail
}
