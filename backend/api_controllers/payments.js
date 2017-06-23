"use strict"
let express = require("express")
let isLogin = require("../middleware/user.js").isLogin
let conektaHelper = require("../helpers/conekta.js")
let emailSender = require("../helpers/emailSender.js")
let models = require("../models")

let Order = models.Order
let User = models.User
let router = express.Router()

const paymentStatus = {
	paid: "pagado",
	pending_payment: "pendiente",
	refunded: "cancelado"
}

router.post("/payment/card", isLogin, function (req, res, next) {
	conektaHelper.paymentFlow(req.body, req.jwtUser.userId).then(conektaOrder => {
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
					auth_code: conektaOrder.charges.data[0].payment_method.auth_code,
					last4: conektaOrder.charges.data[0].payment_method.last4,
					name: conektaOrder.charges.data[0].payment_method.name,
				}
			}

			jorder.details = req.body.details

			User.findOne({where: {id: req.jwtUser.userId}, attributes: ["first_name", "last_name", "email"]})
				.then( user => {
					req.app.render("emails/paid_info", {order: jorder, user: user.toJSON()}, function (err, html) {
						if(err) next(err)
						res.json(jorder)

						let sesConfig = {
							accessKeyId: req.app.get("SES_ID"),
							secretAccessKey: req.app.get("SES_SECRET_KEY"),
							region: req.app.get("SES_REGION")
						}
						emailSender.sendEmail(user.toJSON().email, html, sesConfig)
					})
				})

		})
	}).catch(err => {

		let errNote = null
		if(err.details.length > 0){
			errNote = err.details[0].message
		}else if(err.name === "VerificationError"){
			errNote = err.name
		}else{
			errNote = err.message
		}

		let order = req.body
		order.status = "intencion"
		order.notes = errNote
		order.user_id = req.jwtUser.userId
		// order.notes = err.toString()
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
})

router.post("/payment/cash", isLogin, function (req, res, next) {
	conektaHelper.paymentFlow(req.body, req.jwtUser.userId).then(conektaOrder => {
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
					auth_code: conektaOrder.charges.data[0].payment_method.auth_code,
					last_4: conektaOrder.charges.data[0].payment_method.last_4,
					name: conektaOrder.charges.data[0].payment_method.name,
				}
			}
			jorder.details = req.body.details

			User.findOne({where: {id: req.jwtUser.userId}, attributes: ["first_name", "last_name", "email"]})
				.then( user => {
					let type = jorder.charges.payment_method.type
					req.app.render(`emails/${type}_info`, {order: jorder, user: user.toJSON()}, function (err, html) {
						if(err) next(err)
						res.json(jorder)

						let sesConfig = {
							accessKeyId: req.app.get("SES_ID"),
							secretAccessKey: req.app.get("SES_SECRET_KEY"),
							region: req.app.get("SES_REGION")
						}
						emailSender.sendEmail(user.toJSON().email, html, sesConfig)
					})
				})
		})
	}).catch(next)
})

router.post("/payment/webhook", function (req, res, next) {
	if(req.ips[0] === "52.200.151.182"){
		let object = req.body.data ? req.body.data.object : {}
		if(object.object === "order"){
			let type = object.charges.data[0].payment_method.type
			let status = object.payment_status

			Order.findOne(Order.singleConektaOption(object.id))
				.then(order => {
					if( (type === "oxxo" || type === "spei") && status === "paid" && paymentStatus[status] !== order.status){
						let jorder = order.toJSON()
						jorder.details = jorder.details.map(detail => {
							detail.plu = detail.product.plu
							return detail
						})
						jorder.charges = {
							payment_method: {
								type: type,
								reference_number: object.charges.data[0].payment_method.reference_number,
							}
						}
						cashPaidHook(jorder, jorder.user, req)
						order.update({status: paymentStatus[status]})
					}

					if(type === "credit" && status === "refunded"){
						order.update({status: paymentStatus[status]})
					}
				})
		}
		res.sendStatus(200)
	}else{
		res.sendStatus(401)
	}
})


const cashPaidHook = function (jorder, user, req) {
	req.app.render("emails/paid_info", {order: jorder, user: user}, function (err, html) {
		let sesConfig = {
			accessKeyId: req.app.get("SES_ID"),
			secretAccessKey: req.app.get("SES_SECRET_KEY"),
			region: req.app.get("SES_REGION")
		}
		emailSender.sendEmail(user.email, html, sesConfig)
	})
}

module.exports = router
