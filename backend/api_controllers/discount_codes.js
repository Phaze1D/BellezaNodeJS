'use strict'
let express = require('express')
let models = require('../models')
let Sequelize = require('sequelize')
let multer = require('multer')
let middware = require('../middleware/user.js')

let DiscountCode = models.DiscountCode
let User = models.User

let isLogin = middware.isLogin
let isAdmin = middware.isAdmin
let isUser = middware.isUser
let upload = multer()
let router = express.Router()

let codeFields = [
	'code',
	'expires_date',
	'discount',
	'user_id'
]


router.get('/user/:user_id/codes', isLogin, isAdmin, function (req, res, next) {
	DiscountCode.userCodes(req.params.user_id).then( codes => {
		res.json(codes)
	}).catch(next)
})

router.get('/user/:user_id/check-code', isLogin, isUser, function (req, res, next) {
	DiscountCode.checkCode(req.query.code, req.params.user_id).then( discountCode => {
		if(discountCode){
			res.json(discountCode)
		}else{
			let err = new Sequelize.ValidationError('Codigo Invalido')
			err.errors.push({path: 'code', message: 'Codigo Invalido'})
			return Promise.reject(err)
		}
	}).catch(next)
})

router.post('/user/:client_id/code', isLogin, isAdmin, upload.none(), function (req, res, next) {
	let formData = req.body
	formData.user_id = req.params.client_id
	User.findClient(req.params.client_id).then(user => {
		return DiscountCode.create(formData, {fields: codeFields})
	}).then(code => {
		res.json(code)
	}).catch(next)
})

module.exports = router
