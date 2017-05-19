'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/database.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Address.belongsTo(db.User, {as: 'user'});
db.Address.hasMany(db.Order, {as: 'orderShip', foreignKey: 'shipping_address_id'});
db.Address.hasMany(db.Order, {as: 'orderInvoice', foreignKey: 'invoice_address_id'});

db.Category.belongsTo(db.Category, {as: 'parent', foreignKey: 'parent_id'});
db.Category.hasMany(db.Category, {as: 'subs', foreignKey: 'parent_id'})
db.Category.belongsToMany(db.Product, { as: 'products', through: 'category_product'})

db.Detail.belongsTo(db.Order, {as: 'order'});
db.Detail.belongsTo(db.Product, {as: 'product'});

db.DiscountCode.belongsTo(db.User, {as: 'user'});

db.Order.belongsTo(db.User, {as: 'user'});
db.Order.belongsTo(db.Address, {as: 'shippingAddress', foreignKey: 'shipping_address_id'});
db.Order.belongsTo(db.Address, {as: 'invoiceAddress', foreignKey: 'invoice_address_id'});
db.Order.hasMany(db.Detail, {as: 'details'})

db.Product.hasMany(db.Detail, {as: 'details'})
db.Product.belongsToMany(db.Category, { as: 'categories', through: 'category_product'})

db.User.hasMany(db.Order, {as: 'orders'})
db.User.hasMany(db.Address, {as: 'addresses'})
db.User.hasMany(db.DiscountCode, {as: 'discountCodes'})

module.exports = db;
