'use strict'
let express = require('express')
let models = require('../models')
let reactRender = require('../helpers/reactServerSide')

let Category = models.Category
let Product = models.Product
let router = express.Router()


router.get('/categories/:index/:sub*?/:show*?', function (req, res) {
	let promises = [
		Category.formattedAll()
	]

	reactRender(promises, {categories: 0}, req.url)
		.then(viewOptions => {
			res.render('index', viewOptions)
		}).catch(err => {
			res.redirect('/home')
		})
})


router.get('/product/:id', function (req, res) {

	Product.mFindOne(req.params.id).then(product => {
		let category_id = product.categories.length > 0 ? product.categories[0].id : undefined
		let promises = [
			Category.formattedAll(),
			product,
			Product.categoryProducts(category_id)
		]

		return reactRender(promises, {categories: 0, product: 1, related: 2}, req.url)
	}).then(viewOptions => {
		res.render('index', viewOptions)
	}).catch(err => {
		res.redirect('/home')
	})

})


module.exports = router
