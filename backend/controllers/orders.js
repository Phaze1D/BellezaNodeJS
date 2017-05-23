'use strict'
let express = require('express')
let Order = require('../models').Order

let router = express.Router()


/** REQUIRES USER OR ADMIN VALIDATION */
router.get('/orders', function (req, res) {

})

/** REQUIRES USER OR ADMIN VALIDATION */
router.get('/order/:id', function (req, res) {

})
