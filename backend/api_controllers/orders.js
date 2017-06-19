"use strict"
let express = require("express")
let Order = require("../models").Order
let middware = require("../middleware/user.js")

let isLogin = middware.isLogin
let isAdmin = middware.isAdmin
let router = express.Router()


router.get("/orders", isLogin, isAdmin, function (req, res, next) {
	Order.backOfficeAll(req.query).then(results => {
		res.json(results)
	}).catch(next)
})

router.get("/user/:user_id/orders", isLogin, isAdmin, function (req, res, next) {
	Order.userOrders(req.query, req.params.user_id).then(results => {
		res.json(results)
	}).catch(next)
})

router.get("/user/:user_id/order/:id", isLogin, isAdmin, function (req, res, next) {
	Order.mFindOne(req.params).then(order => {
		res.json(order)
	}).catch(next)
})

module.exports = router
