'use strict'
let valmsg =  require('../helpers/validationMessages.js')

module.exports = function(sequelize, DataTypes) {
	const DiscountCode =  sequelize.define('DiscountCode', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		code: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: {
				args: true,
				message: 'Codigo Invalido'
			},
			validate: {
				notEmpty: {
					args: true,
					msg: valmsg.required
				},
				isUnique: (value, next) => {
					DiscountCode.findOne({where: {code: value}})
						.then( (discountCode) => {
							if(discountCode){
								throw new Error('Codigo Invalido')
							}
							return next()
						}).catch(next)
				}
			}
		},
		expires_date: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: valmsg.required
				},
				isDate: true
			}
		},
		discount: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: valmsg.required
				},
				min: {
					args: 1,
					msg: valmsg.min(1)
				},
				max: {
					args: 90,
					msg: valmsg.max(90)
				}
			}
		},
		user_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'User',
				key: 'id'
			}
		},
	}, {
		tableName: 'discount_codes'
	})

	DiscountCode.userCodes = function (user_id) {
		return this.findAll({where: {user_id: user_id}})
	}

	DiscountCode.checkCode = function (code, user_id) {
		return this.findOne({
			where: {
				code: code,
				user_id: user_id,
				expires_date: {$gt: new Date()}
			}
		})
	}

	return DiscountCode
}
