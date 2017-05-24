'use strict'
let categories = require('./categories.js')
let products = require('./products.js')
let users = require('./users.js')
let addresses = require('./addresses.js')
let backoffice = require('./backoffice.js')
let discount_codes = require('./discount_codes.js')
let orders = require('./orders.js')
let password_reset = require('./password_reset.js')


let controllers = {
  categories: categories,
  products: products,
  users: users,
  addresses: addresses,
  backoffice: backoffice,
  discount_codes: discount_codes,
  orders: orders,
  password_reset: password_reset,
}


module.exports = controllers
