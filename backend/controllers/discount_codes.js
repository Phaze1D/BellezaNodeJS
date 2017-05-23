'use strict'
let express = require('express')
let DiscountCode = require('../models').DiscountCode
let router = express.Router()

let codeFields = [
  'code',
  'expires_date',
  'discount',
  'is_percentage',
  'user_id'
]


/** REQUIRES ADMIN OR USER VALIDATION */
router.get('/codes', function (req, res, next) {
  DiscountCode.findAll().then( codes => {
    res.json(codes)
  }).catch(next)
})

/** REQUIRES USER VALIDATION */
router.get('/check-code', function (req, res, next) {
  DiscountCode.findOne({code: req.query.code}).then( discountCode => {
    res.json(200)
  }).catch(next)
})

/** REQUIRES ADMIN VALIDATION */
router.post('/code', function (req, res, next) {
  DiscountCode.create(req.body, {fields: codeFields}).then(code => {
    res.json(code)
  }).catch(next)
})

module.exports = router
