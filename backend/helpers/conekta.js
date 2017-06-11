'use strict'
let models = require('../models')
let conekta = require('conekta-promise')
let User = models.User
let Product = models.Product
let DiscountCode = models.DiscountCode

conekta.locale = 'es'
conekta.api_key = 'key_iA6gW6UnTvwRkT4CwTm7YA'
conekta.api_version = '2.0.0'

let userAtt = [
  'first_name',
  'last_name',
  'email',
  'telephone',
  'conekta_id',
  'id'
]
let prodAtt = [
  'id',
  'price',
  'discount',
  'iva',
  'stock'
]

let VERIFICATION_ERROR = {error: 401, message: 'verification error'}

const cardPaymentFlow = (cart, userId) => {
  return verifyCart(cart, userId)
  .then(products => {
    return User.findOne({where: {id: userId}, attributes: userAtt, rejectOnEmpty: true})
  })
  .then(user => {
    if(user.conekta_id){
      return user
    }else{
      return conekta.Customer.create({
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        phone: user.telephone,
      }).then(conCust => {
        return user.update({conekta_id: conCust.toObject().id})
      })
    }
  })
  .then(user => {
    let formatted = formatOrder(cart, user.conekta_id)
    formatted.charges = [{
      payment_method: {
        type: cart.payment_source.type,
        token_id: cart.payment_source.token,
      },
      amount: cart.total
    }]
    return conekta.Order.create(formatted)
  })
}

const cashPaymentFlow = (cart, userId) => {
  return verifyCart(cart, userId)
  .then(products => {
    return User.findOne({where: {id: userId}, attributes: userAtt, rejectOnEmpty: true})
  })
  .then(user => {
    if(user.conekta_id){
      return user
    }else{
      return conekta.Customer.create({
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        phone: user.telephone,
      }).then(conCust => {
        return user.update({conekta_id: conCust.toObject().id})
      })
    }
  })
  .then(user => {
    let expiresDate = new Date()
    expiresDate.setDate(expiresDate.getDate() + 3)
    let formatted = formatOrder(cart, user.conekta_id)
    formatted.charges = [{
      payment_method: {
        type: cart.payment_source.type,
      },
      expires_at: expiresDate.getTime(),
      amount: cart.total
    }]
    return conekta.Order.create(formatted)
  })
}

const verifyCart = (cart, userId) => {
  let pin = cart.details.map(detail => detail.product_id)
  let oDetails = {}
  cart.details.forEach(detail => oDetails[detail.product_id] = detail)

  return DiscountCode.findById(cart.discount_code_id).then(discount_code => {
    discount_code = discount_code ? discount_code.toJSON() : null
    return Product.findAll({where: {id: {$in: pin }}, attributes: prodAtt, rejectOnEmpty: true})
    .then(products => {
      let sub_total = 0
      let iva_total = 0
      let shipping_total = 0

      for (var i = 0; i < products.length; i++) {
        let product = products[i]
        let pjson = product.toJSON()

        if( !(oDetails[pjson.id] && oDetails[pjson.id].quantity <= pjson.stock) ){
          VERIFICATION_ERROR.info = {car: oDetails[pjson.id].quantity, ser: pjson.stock}
          return Promise.reject(VERIFICATION_ERROR)
        }

        let pPrice = Math.round(pjson.price * (1 - pjson.discount/100))
        let dPrice = Math.round(oDetails[pjson.id].price * (1 - oDetails[pjson.id].discount/100))

        if( dPrice != pPrice){
          VERIFICATION_ERROR.info = {dPrice: dPrice, pPrice: pPrice}
          return Promise.reject(VERIFICATION_ERROR)
        }

        sub_total += pPrice * oDetails[pjson.id].quantity
        iva_total += Math.round(pPrice * oDetails[pjson.id].quantity * (pjson.iva/100))
        product.update({stock: pjson.stock - oDetails[pjson.id].quantity})
      }

      shipping_total = sub_total < 100000 ? 15000 : 0

      if( !(sub_total == cart.sub_total && iva_total == cart.iva_total && shipping_total == cart.shipping_total) ){
        VERIFICATION_ERROR.info = {
          subt: sub_total,
          csubt: cart.sub_total,
          ivat: iva_total,
          civat: cart.iva_total,
          ship: shipping_total,
          cship: cart.shipping_total
        }
        return Promise.reject(VERIFICATION_ERROR)
      }

      let total = sub_total + iva_total + shipping_total

      if(cart.discount_code_id){
        if(cart.discount_code_id == discount_code.id && discount_code.user_id == userId){
          let discount_total = 0
          discount_total = Math.round(total * (discount_code.discount/100))
          total -= discount_total
        }else{
          VERIFICATION_ERROR.info = {
            cdis: cart.discount_code_id,
            dis: discount_code.id,
            disU: discount_code.user_id,
            u: userId
          }
          return Promise.reject(VERIFICATION_ERROR)
        }
      }

      if(total != cart.total){
        VERIFICATION_ERROR.info = {
          tot: total,
          ctot: cart.totaln
        }
        return Promise.reject(VERIFICATION_ERROR)
      }

      return products
    })
  })
}

const formatOrder = (cart, customer_id) => {
  let line_items = cart.details.map(detail => {
    return {
      name: detail.name,
      unit_price: Math.round( detail.price * (1 - (detail.discount/100)) ),
      quantity: detail.quantity,
    }
  })

  let shipping_line = {
    amount: cart.shipping_total,
    carrier: 'RedPax'
  }

  let tax_line = {
    description: 'IVA',
    amount: cart.iva_total
  }

  let discount_line = null
  if(cart.discount_code_id){
    discount_line = {
      amount: cart.discount_total,
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

  return {
    customer_info: {customer_id: customer_id},
    currency: "MXN",
    line_items: line_items,
    shipping_lines: [shipping_line],
    tax_lines: [tax_line],
    discount_lines: [discount_line],
    shipping_contact: shipping_contact,
  }
}


module.exports = {
  cardPaymentFlow: cardPaymentFlow,
  cashPaymentFlow: cashPaymentFlow
}
