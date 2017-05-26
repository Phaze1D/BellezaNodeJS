'use strict'
let User = require('../models').User
let conekta = require('conekta')
conekta.locale = 'es'
conekta.api_key = 'key_ZnvPsaqkbDWw21riivzRKw'

let userAtt = ['first_name', 'last_name', 'email', 'telephone', 'conekta_id']

const cardPaymentFlow = (req, successCB, errorCB) => {
  User.findOne({where: {id: req.jwtUser.userId}, attributes: userAtt})
  .then(user => {
    if(user.conekta_id){
      createOrder(req.body, user.conekta_id, successCB, errorCB)
    }else{
      conekta.Customer.create({
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        phone: user.telephone,
      }, (err, customer) => {
        if(err) errorCB(err);

        let order = formatOrder(req.body, customer.toObject().id)
        conekta.Order.create(order, (err, res) => {
          console.log(err);
          if(res) console.log(res.toObject());
          successCB()
        })
      })
    }
  }).catch(errorCB)
}

const verifyCart = (cart) => {

}

const formatOrder = (cart, customer_id) => {
  let line_items = cart.details.map(detail => {
    return {
      name: detail.name,
      unit_price: Math.round( (detail.price * (1 - (detail.discount/100) ) ) * 100),
      quantity: detail.quantity,
    }
  })

  let shipping_line = {
    amount: Math.round(cart.shipping_total * 100),
    carrier: 'RedPax'
  }

  let tax_line = {
    description: 'IVA',
    amount: Math.round(cart.iva_total * 100)
  }

  let discount_line = null
  if(cart.discount_code_id){
    discount_line = {
      amount: Math.round(cart.discount_total * -100),
      code: `${cart.discount_code_id*100}`,
      type: 'coupon'
    }
  }

  let shipping_contact = {
    phone: cart.shippingAddress.telephone,
    receiver: `${cart.shippingAddress.first_name} ${cart.shippingAddress.last_name}`,
    address: {
      street1: cart.shippingAddress.street,
      street2: cart.shippingAddress.street2,
      city: cart.shippingAddress.city,
      state: cart.shippingAddress.state,
      country: cart.shippingAddress.country,
      postal_code: cart.shippingAddress.zipcode
    }
  }

  let expires_at = new Date
  expires_at.setDate(expires_at.getDate() + 3)

  let charge = {
    payment_method: {
      type: 'card',
      token_id: cart.payment_source.token,
    },
    livemode: false,
    amount: Math.round(cart.total * 100)
  }

  return {
    customer_info: {customer_id: customer_id},
    currency: "MXN",
    line_items: line_items,
    shipping_lines: [shipping_line],
    tax_lines: [tax_line],
    discount_lines: [discount_line],
    shipping_contact: shipping_contact,
    charges: [charge]
  }
}


module.exports = {
  cardPaymentFlow: cardPaymentFlow
}
