'use strict'
let express = require('express')
let multer = require('multer')
let crypto = require('crypto')
let Sequelize = require('sequelize')
var bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let models = require('../models')
let User = models.User
let Address = models.Address
let emailSender = require('../helpers/emailSender.js')


let upload = multer()
let router = express.Router()


router.post('/forgot', upload.none(), function (req, res, next) {
	User.findByEmail(req.body.email).then(user => {
		if(user){
			let token = crypto.randomBytes(32).toString('hex')
			user.update({password_reset_token: token, password_reset_date: Date.now() + 3600000})
				.then( user => {
					let info = {
						name: user.first_name + ' ' + user.last_name,
						action_url: 'http://'+req.headers.host+'/password/reset/'+token,
						support_url: 'http://'+req.headers.host+''
					}

					req.app.render('emails/password_reset', info, function (err, html) {
						if(err) next(err)
						res.sendStatus(200)

						let sesConfig = {
							accessKeyId: req.app.get('SES_ID'),
							secretAccessKey: req.app.get('SES_SECRET_KEY'),
							region: req.app.get('SES_REGION')
						}
						emailSender.sendEmail(user.toJSON().email, html, sesConfig, 'Restablecimiento de Contraseña')
					})
				})
		}else{
			let err = new Sequelize.ValidationError('Correo electrónico no registrado')
			err.errors.push({path: 'email', message: 'Correo electrónico no registrado'})
			return Promise.reject(err)
		}
	}).catch(next)
})

router.post('/reset/:token', upload.none(), function (req, res, next) {

	let option = {
		where: {
			email: req.body.email,
			password_reset_token: req.params.token,
			password_reset_date: {$gt: new Date()}
		},
		include: [{
			model: Address,
			as: 'addresses',
		}]
	}

	User.findOne(option).then(user => {
		if(user && req.body.password.length > 6){

			return bcrypt.hash(req.body.password, 10).then((hash) => {
				user.password = hash
				user.password_reset_date = null
				user.password_reset_token = null
				return user.save()
			})
		}else{
			let err = new Sequelize.ValidationError('Inválido')
			err.errors.push({path: 'token', message: 'Inválido'})
			return Promise.reject(err)
		}
	}).then(user => {
		let ru = user.toJSON()
		let token =  jwt.sign({ userId:  ru.id, isAdmin: ru.admin}, req.app.get('SECRET'))
		delete ru.password
		delete ru.conekta_id
		delete ru.password_reset_token
		delete ru.password_reset_date
		res.append('Authorization', `Bearer ${token}`)
		res.json(ru)
	}).catch(next)

})


module.exports = router
