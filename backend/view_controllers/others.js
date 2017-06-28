'use strict'
let express = require('express')
let models= require('../models')
let reactRender = require('../helpers/reactServerSide')

let Banner = models.Banner
let Category = models.Category
let Product = models.Product
let router = express.Router()


router.get('/', function (req, res, next) {
	let promises = [
		Category.formattedAll(),
		Banner.carouselImages(),
		Product.favorites()
	]

	reactRender(promises, {categories: 0, banners: 1, products: 2}, req.url)
		.then(viewOptions => {
			res.render('index', viewOptions)
		}).catch(next)
})

router.get('/home', function (req, res, next) {
	let promises = [
		Category.formattedAll(),
		Banner.carouselImages(),
		Product.favorites()
	]

	reactRender(promises, {categories: 0, banners: 1, products: 2}, req.url)
		.then(viewOptions => {
			res.render('index', viewOptions)
		}).catch(next)
})

router.get('/search', function (req, res) {
	let promises = [
		Category.formattedAll(),
		Product.mFindAll(req.query, true)
	]

	reactRender(promises, {categories: 0, products: 1}, req.url)
		.then(viewOptions => {
			res.render('index', viewOptions)
		}).catch(err => {
			res.redirect('/home')
		})
})

router.get('/signin', function (req, res) {
	let promises = [
		Category.formattedAll(),
	]

	reactRender(promises, {categories: 0}, req.url)
		.then(viewOptions => {
			res.render('index', viewOptions)
		}).catch(err => {
			res.redirect('/home')
		})
})

router.get('/password/reset/:token', function (req, res) {
	let promises = [
		Category.formattedAll(),
	]

	reactRender(promises, {categories: 0}, req.url)
		.then(viewOptions => {
			res.render('index', viewOptions)
		}).catch(err => {
			res.redirect('/home')
		})
})


module.exports = router
