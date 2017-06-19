"use strict"

module.exports = function(sequelize, DataTypes) {
	let Banner = sequelize.define("Banner", {
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
			defaultValue: "0"
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
		tableName: "banners"
	})

	Banner.carouselImages = function () {
		return this.findAndCountAll({
			where: {
				$or : [{
					manual_active: true,
				}, {
					start_date: {$lt: Date.now()},
					end_date: {$gt: Date.now()},
				}]
			},
			rejectOnEmpty: false,
		})
	}

	Banner.backOfficeAll = function (page, prePage) {
		return this.findAndCountAll({offset: prePage*page, limit: prePage})
	}

	Banner.mFindOne = function (id, reject=true) {
		return this.findById(id, {rejectOnEmpty: reject})
	}

	return Banner
}
