'use strict'
let express = require('express')
let isLogin = require('../middleware/user.js').isLogin
let conektaHelper = require('../helpers/conekta.js')
let models = require('../models')
let Order = models.Order
let router = express.Router()

const paymentStatus = {
  paid: 'pagado',
  pending_payment: 'pendiente'
}


router.post('/payment/card', isLogin, function (req, res, next) {
  conektaHelper.cardPaymentFlow(req.body, req.jwtUser.userId).then(conektaOrder => {
    let order = req.body
    conektaOrder = conektaOrder.toObject()
    order.conekta_id = conektaOrder.id
    order.status = paymentStatus[conektaOrder.payment_status]
    order.user_id = req.jwtUser.userId
    delete order.shipping_address_id
    delete order.invoice_address_id
    if(Object.keys(order.invoiceAddress).length === 0){
      delete order.invoiceAddress
    }
    return Order.create(order, Order.createOptions()).then(order => {
      let jorder = order.toJSON()
      jorder.charges = conektaOrder.charges.data[0]
      res.json(jorder)
    })
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })

})

router.post('/payment/cash', isLogin, function (req, res, next) {
  conektaHelper.cashPaymentFlow(req.body, req.jwtUser.userId).then(conektaOrder => {
    let order = req.body
    conektaOrder = conektaOrder.toObject()
    order.conekta_id = conektaOrder.id
    order.status = paymentStatus[conektaOrder.payment_status]
    order.user_id = req.jwtUser.userId
    delete order.shipping_address_id
    delete order.invoice_address_id
    if(Object.keys(order.invoiceAddress).length === 0){
      delete order.invoiceAddress
    }
    return Order.create(order, Order.createOptions()).then(order => {
      let jorder = order.toJSON()
      jorder.charges = conektaOrder.charges.data[0]
      res.json(jorder)
    })
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router
