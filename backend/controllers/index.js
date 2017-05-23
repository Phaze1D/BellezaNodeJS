'use strict'
let categories = require('./categories.js')
let products = require('./products.js')
let users = require('./users.js')
let addresses = require('./addresses.js')
let backoffice = require('./backoffice.js')
let discount_codes = require('./discount_codes.js')


let controllers = {
  categories: categories,
  products: products,
  users: users,
  addresses: addresses,
  backoffice: backoffice,
  discount_codes: discount_codes
}


module.exports = controllers
