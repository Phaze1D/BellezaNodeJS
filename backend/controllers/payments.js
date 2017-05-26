'use strict'
let express = require('express')
let isLogin = require('../middleware/user.js').isLogin
let conektaHelper = require('../helpers/conekta.js')
let router = express.Router()



/** REQUIRES USER VALIDATION */
router.post('/payment/card', isLogin, function (req, res, next) {
  conektaHelper.cardPaymentFlow(req, (order) => {
    res.sendStatus(200)
  },(err) => {
    res.sendStatus(404)
  })

})

/** REQUIRES USER VALIDATION */
router.post('/payment/cash', isLogin, function (req, res, next) {

})

module.exports = router
