'use strict'
let express = require('express')
let isLogin = require('../middleware/user.js').isLogin
let conektaHelper = require('../helpers/conekta.js')
let models = require('../models')
let Order = models.Order
let router = express.Router()


// NEED TO DECREMENT STOCK
router.post('/payment/card', isLogin, function (req, res, next) {
  conektaHelper.cardPaymentFlow(req.body, req.jwtUser.userId).then(conektaOrder => {
    let order = req.body
    conektaOrder = conektaOrder.toObject()
    order.conekta_id = conektaOrder.id
    order.status = conektaOrder.payment_status
    order.user_id = req.jwtUser.userId
    delete order.shipping_address_id
    delete order.invoice_address_id
    if(Object.keys(order.invoiceAddress).length === 0){
      delete order.invoiceAddress
    }
    return Order.create(order, Order.createOptions())
  }).then(order => {
    res.sendStatus(200)
  }).catch(err => {
    console.log(err);
    res.sendStatus(401)
  })

})

router.post('/payment/cash', isLogin, function (req, res, next) {

})

module.exports = router
