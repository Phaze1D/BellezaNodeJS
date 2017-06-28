'use strict'
let Sequelize = require('sequelize')
let env       = process.env.NODE_ENV || 'development'
let config    = require('../config/database.js')[env]
let db        = {}
let sequelize = {}

if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
	sequelize = new Sequelize(config.database, config.username, config.password, config)
}


db['Address'] = require('./address')(sequelize, Sequelize.DataTypes)
db['Banner'] = require('./banner')(sequelize, Sequelize.DataTypes)
db['CategoriesProducts'] = require('./categories_products')(sequelize, Sequelize.DataTypes)
db['Category'] = require('./category')(sequelize, Sequelize.DataTypes)
db['Detail'] = require('./detail')(sequelize, Sequelize.DataTypes)
db['DiscountCode'] = require('./discount_code')(sequelize, Sequelize.DataTypes)
db['Mailing'] = require('./mailing')(sequelize, Sequelize.DataTypes)
db['Order'] = require('./order')(sequelize, Sequelize.DataTypes)
db['Product'] = require('./product')(sequelize, Sequelize.DataTypes)
db['User'] = require('./user')(sequelize, Sequelize.DataTypes)

db.sequelize = sequelize
db.Sequelize = Sequelize

db.Address.belongsTo(db.User, {as: 'user'})
db.Address.hasMany(db.Order, {as: 'orderShip', foreignKey: 'shipping_address_id'})
db.Address.hasMany(db.Order, {as: 'orderInvoice', foreignKey: 'invoice_address_id'})

db.Category.belongsTo(db.Category, {as: 'parent', foreignKey: 'parent_id'})
db.Category.hasMany(db.Category, {as: 'subs', foreignKey: 'parent_id'})
db.Category.belongsToMany(db.Product, { as: 'products', through: db.CategoriesProducts,  foreignKey: 'categories_id'})

db.Detail.belongsTo(db.Order, {as: 'order'})
db.Detail.belongsTo(db.Product, {as: 'product'})

db.DiscountCode.belongsTo(db.User, {as: 'user'})
db.DiscountCode.hasMany(db.Order, {as: 'orders'})

db.Order.belongsTo(db.User, {as: 'user'})
db.Order.belongsTo(db.Address, {as: 'shippingAddress', foreignKey: 'shipping_address_id'})
db.Order.belongsTo(db.Address, {as: 'invoiceAddress', foreignKey: 'invoice_address_id'})
db.Order.belongsTo(db.DiscountCode, {as: 'discountCode'})
db.Order.hasMany(db.Detail, {as: 'details'})

db.Product.hasMany(db.Detail, {as: 'details'})
db.Product.belongsToMany(db.Category, { as: 'categories', through: db.CategoriesProducts, foreignKey: 'products_id'})

db.User.hasMany(db.Order, {as: 'orders'})
db.User.hasMany(db.Address, {as: 'addresses'})
db.User.hasMany(db.DiscountCode, {as: 'discountCodes'})

module.exports = db
