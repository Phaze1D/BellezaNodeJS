'use strict'
let express = require('express')
let isLogin = require('../middleware/user.js').isLogin
let conektaHelper = require('../helpers/conekta.js')
let emailSender = require('../helpers/emailSender.js')
let models = require('../models')
let Order = models.Order
let User = models.User
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
    delete order.shippingAddress.id

    if(Object.keys(order.invoiceAddress).length === 0){
      delete order.invoiceAddress
    }else {
      delete order.invoiceAddress.id
    }

    return Order.create(order, Order.createOptions()).then(order => {
      let jorder = order.toJSON()
      jorder.charges = {
        payment_method: {
          type: conektaOrder.charges.data[0].payment_method.type,
          reference: conektaOrder.charges.data[0].payment_method.reference,
          clabe: conektaOrder.charges.data[0].payment_method.clabe,
        }
      }

      jorder.details = req.body.details

      User.findOne({where: {id: req.jwtUser.userId}, attributes: ['first_name', 'last_name', 'email']})
      .then( user => {
        req.app.render('paid_info', {order: jorder, user: user.toJSON()}, function (err, html) {
          if(err) next(err);
          res.json(jorder)

          let sesConfig = {
            accessKeyId: req.app.get('SES_ID'),
            secretAccessKey: req.app.get('SES_SECRET_KEY'),
            region: req.app.get('SES_REGION')
          }
          emailSender.sendEmail(user.toJSON().email, html, sesConfig)
        })
      })

    })
  }).catch(next)
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
    delete order.shippingAddress.id

    if(Object.keys(order.invoiceAddress).length === 0){
      delete order.invoiceAddress
    }else {
      delete order.invoiceAddress.id
    }

    return Order.create(order, Order.createOptions()).then(order => {
      let jorder = order.toJSON()
      jorder.charges = {
        payment_method: {
          type: conektaOrder.charges.data[0].payment_method.type,
          reference: conektaOrder.charges.data[0].payment_method.reference,
          clabe: conektaOrder.charges.data[0].payment_method.clabe,
        }
      }
      jorder.details = req.body.details

      User.findOne({where: {id: req.jwtUser.userId}, attributes: ['first_name', 'last_name', 'email']})
      .then( user => {
        let type = jorder.charges.payment_method.type
        req.app.render(`${type}_info`, {order: jorder, user: user.toJSON()}, function (err, html) {
          if(err) next(err);
          res.json(jorder)

          let sesConfig = {
            accessKeyId: req.app.get('SES_ID'),
            secretAccessKey: req.app.get('SES_SECRET_KEY'),
            region: req.app.get('SES_REGION')
          }
          emailSender.sendEmail(user.toJSON().email, html, sesConfig)
        })
      })
    })
  }).catch(next)
})

module.exports = router
