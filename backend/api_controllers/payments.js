"use strict"
let express = require("express")
let isLogin = require("../middleware/user.js").isLogin
let conektaHelper = require("../helpers/conekta.js")
let emailSender = require("../helpers/emailSender.js")
let models = require("../models")

let Order = models.Order
let router = express.Router()

const paymentStatus = {
	paid: "pagado",
	pending_payment: "pendiente",
	refunded: "cancelado"
}

router.post("/payment/card", isLogin, function (req, res, next) {
	conektaHelper.paymentFlow(req, res, next)
})

router.post("/payment/cash", isLogin, function (req, res, next) {
	conektaHelper.paymentFlow(req, res, next)
})

router.post("/payment/webhook", function (req, res) {
	if(req.ips[0] === "52.200.151.182"){
		let object = req.body.data ? req.body.data.object : {}
		if(object.object === "order" && object.payment_status){
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
		emailSender.sendEmail("recepcion@vidaflor.com.mx", html, sesConfig)
		emailSender.sendEmail("ventas@bellezaorganica.com.mx", html, sesConfig)
	})
}

module.exports = router
