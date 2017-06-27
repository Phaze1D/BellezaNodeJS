"use strict"
let models = require("../models")
let conekta = require("conekta-promise")
let emailSender = require("../helpers/emailSender.js")
let User = models.User
let Product = models.Product
let Order = models.Order
let DiscountCode = models.DiscountCode

conekta.locale = "es"
conekta.api_version = "2.0.0"

let userAtt = [
	"first_name",
	"last_name",
	"email",
	"telephone",
	"conekta_id",
	"id"
]
let prodAtt = [
	"id",
	"price",
	"discount",
	"iva",
	"stock"
]
let paymentStatus = {
	paid: "pagado",
	pending_payment: "pendiente",
	refunded: "cancelado"
}

let VERIFICATION_ERROR = {name: "VerificationError", error: 401, message: "verification error"}

const paymentFlow = (req, res, next) => {
	let cart = req.body
	let userId = req.jwtUser.userId
	let fUser = null
	let fConektaOrder = null
	let toPro = []
	conekta.api_key = req.app.get("CONEKTA")

	return verifyCart(cart, userId)
		// Get User
		.then(products => {
			toPro = products
			return User.findOne({where: {id: userId}, attributes: userAtt, rejectOnEmpty: true})
		})
		// Get conekta_id by creating conekta.Customer or return previous conekta_id
		.then(user => {
			fUser = user
			if(user.conekta_id){
				return user
			}else{
				return conekta.Customer.create({
					name: `${user.first_name} ${user.last_name}`,
					email: user.email,
					phone: (user.telephone ? user.telephone : undefined),
				}).then(conCust => {
					return user.update({conekta_id: conCust.toObject().id})
				})
			}
		})
		// Create conekta.Order
		.then(user => {
			let expiresDate = new Date()
			expiresDate.setDate(expiresDate.getDate() + 3)
			let formatted = formatOrder(cart, user.conekta_id)
			let payment_method = {type: cart.payment_source.type}
			if(payment_method.type === "card"){
				payment_method.token_id = cart.payment_source.token
			}
			formatted.charges = [{
				payment_method: payment_method,
				expires_at: expiresDate.getTime(),
				amount: cart.total
			}]
			return conekta.Order.create(formatted)
		})
		// Update products stock and create Order
		.then(conektaOrder => {
			toPro.forEach(product => product.save())
			fConektaOrder = conektaOrder.toObject()

			let order = req.body
			order.conekta_id = fConektaOrder.id
			order.status = paymentStatus[fConektaOrder.payment_status]
			order.user_id = userId
			delete order.shipping_address_id
			delete order.invoice_address_id
			delete order.shippingAddress.id

			if(Object.keys(order.invoiceAddress).length === 0){
				delete order.invoiceAddress
			}else {
				delete order.invoiceAddress.id
			}

			return Order.create(order, Order.createOptions())
		})
		// Render email template and send email
		.then(order => {
			let jorder = order.toJSON()
			jorder.charges = {
				payment_method: {
					type: fConektaOrder.charges.data[0].payment_method.type,
					reference: fConektaOrder.charges.data[0].payment_method.reference,
					clabe: fConektaOrder.charges.data[0].payment_method.clabe,
					auth_code: fConektaOrder.charges.data[0].payment_method.auth_code,
					last4: fConektaOrder.charges.data[0].payment_method.last4,
					name: fConektaOrder.charges.data[0].payment_method.name,
				}
			}
			jorder.details = req.body.details

			let etype = cart.payment_source.type
			etype = (etype === "card") ? "paid" : etype

			req.app.render(`emails/${etype}_info`, {order: jorder, user: fUser.toJSON()}, function (err, html) {
				if(err) next(err)
				res.json(jorder)

				let sesConfig = {
					accessKeyId: req.app.get("SES_ID"),
					secretAccessKey: req.app.get("SES_SECRET_KEY"),
					region: req.app.get("SES_REGION")
				}
				emailSender.sendEmail(fUser.toJSON().email, html, sesConfig)
				emailSender.sendEmail("recepcion@vidaflor.com.mx", html, sesConfig)
				emailSender.sendEmail("ventas@bellezaorganica.com.mx", html, sesConfig)
			})
		})
		// Catch err and create order intencion
		.catch(err => {
			let errNote = null
			if(err.details && err.details.length > 0){
				errNote = err.details[0].message
			}else if(err.name === "VerificationError"){
				errNote = err.name
			}else{
				errNote = err.message
			}

			let order = req.body
			order.status = "intencion"
			order.notes = errNote
			order.user_id = userId
			delete order.shipping_address_id
			delete order.invoice_address_id
			delete order.shippingAddress.id

			if(Object.keys(order.invoiceAddress).length === 0){
				delete order.invoiceAddress
			}else {
				delete order.invoiceAddress.id
			}

			Order.create(order, Order.createOptions())
			next(err)
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

					let pPrice = pjson.price * (1 - pjson.discount/100)
					let dPrice = oDetails[pjson.id].price * (1 - oDetails[pjson.id].discount/100)

					if( Math.round(dPrice) != Math.round(pPrice)){
						VERIFICATION_ERROR.info = {dPrice: dPrice, pPrice: pPrice}
						return Promise.reject(VERIFICATION_ERROR)
					}

					sub_total += pPrice/(1+oDetails[pjson.id].iva/100) *  oDetails[pjson.id].quantity
					iva_total += oDetails[pjson.id].sub_total*(oDetails[pjson.id].iva/100)
					product.stock = pjson.stock - oDetails[pjson.id].quantity
				}

				shipping_total = sub_total < 100000 ? 15000 : 0

				if( !(Math.round(sub_total) == cart.sub_total && Math.round(iva_total) == cart.iva_total && shipping_total == cart.shipping_total) ){
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
						discount_total = total * (discount_code.discount/100)
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

				if(Math.round(total) != cart.total){
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
		let price = detail.price * (1 - (detail.discount/100))
		return {
			name: detail.name,
			unit_price: Math.round(price/(1+detail.iva/100)),
			quantity: detail.quantity,
			sku: detail.plu
		}
	})

	let shipping_line = {
		amount: cart.shipping_total,
		carrier: "RedPax"
	}

	let tax_line = {
		description: "IVA",
		amount: cart.iva_total
	}

	let discount_line = null
	if(cart.discount_code_id){
		discount_line = {
			amount: cart.discount_total,
			code: `${cart.discount_code_id*100}`,
			type: "coupon"
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
	paymentFlow: paymentFlow
}
