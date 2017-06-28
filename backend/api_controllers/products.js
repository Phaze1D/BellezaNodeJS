'use strict'
let express = require('express')
let router = express.Router()
let multer = require('multer')
let models = require('../models')
let middleware = require('../middleware/user.js')
let productImage = require('../helpers/validationMessages.js').productImage
let aws = require('aws-sdk')
let awsHelper = require('../helpers/aws.js')

let isLogin = middleware.isLogin
let isAdmin = middleware.isAdmin
const Product = models.Product
let upload = multer()



let productFields = [
	'plu',
	'name',
	'volume',
	'description',
	'benefits',
	'ingredients',
	'price',
	'discount',
	'iva',
	'stock',
	'active',
	'fav'
]

let productFiles = [
	{name: 'main_image'},
	{name: 'second_image'},
]


router.get('/products', function (req, res, next) {
	Product.mFindAll(req.query, true).then( results => {
		res.json(results)
	}).catch(next)
})

router.get('/favProducts', function (req, res, next) {
	Product.favorites().then( results => {
		res.set({ 'Cache-Control': 'max-age=350000'}).json(results)
	}).catch(next)
})

router.get('/product/:id', function (req, res, next) {
	Product.mFindOne(req.params.id).then(product => {
		let category_id = product.categories.length > 0 ? product.categories[0].id : undefined
		Product.categoryProducts(category_id).then(related => {
			let pro = product.toJSON()
			pro.related = related
			res.json(pro)
		})
	}).catch(next)

})

router.get('/backoffice/products', isLogin, isAdmin, function (req, res, next) {
	Product.mFindAll(req.query, false).then( results => {
		res.json(results)
	}).catch(next)
})

router.post('/product', isLogin, isAdmin, upload.fields(productFiles), function (req, res, next) {
	let mainimg = req.files.main_image ? req.files.main_image[0].buffer : null
	let secimg = req.files.second_image ? req.files.second_image[0].buffer : null

	productImage(mainimg, secimg).then(buffers => {
		return Product.create(req.body, {fields: productFields}).then(product => {
			let s3 = new aws.S3({
				accessKeyId: req.app.get('S3_ID'),
				secretAccessKey: req.app.get('S3_SECRET_KEY'),
			})
			let uploads = [
				s3.upload(awsHelper.uploadS3(buffers[0], `products/lg/${product.plu}.jpg`)).promise(),
				s3.upload(awsHelper.uploadS3(buffers[1], `products/md/${product.plu}.jpg`)).promise(),
				s3.upload(awsHelper.uploadS3(buffers[2], `products/sm/${product.plu}.jpg`)).promise(),
				s3.upload(awsHelper.uploadS3(buffers[3], `products/xs/${product.plu}.jpg`)).promise(),
				s3.upload(awsHelper.uploadS3(buffers[4], `products/xxs/${product.plu}.jpg`)).promise(),

				s3.upload(awsHelper.uploadS3(buffers[5], `products/lg/${product.plu}_2.jpg`)).promise(),
				s3.upload(awsHelper.uploadS3(buffers[6], `products/md/${product.plu}_2.jpg`)).promise(),
				s3.upload(awsHelper.uploadS3(buffers[7], `products/sm/${product.plu}_2.jpg`)).promise(),
				s3.upload(awsHelper.uploadS3(buffers[8], `products/xs/${product.plu}_2.jpg`)).promise(),
				s3.upload(awsHelper.uploadS3(buffers[9], `products/xxs/${product.plu}_2.jpg`)).promise(),
			]

			return Promise.all(uploads)
		})
	}).then(data => {
		res.sendStatus(200)
	}).catch(next)
})

router.put('/product/:id', isLogin, isAdmin, upload.fields(productFiles), function (req, res, next) {
	let mainimg = req.files.main_image ? req.files.main_image[0].buffer : null
	let secimg = req.files.second_image ? req.files.second_image[0].buffer : null
	let realProduct = null
	Product.findById(req.params.id, {rejectOnEmpty: true}).then(product => {
		realProduct = product
		return product.update(req.body, {fields: productFields.slice(1)})
	}).then(product => {
		if(req.body.categories){
			return product.setCategories(req.body.categories)
		}else{
			return product.setCategories([])
		}
	}).then(procates => {
		if(mainimg && secimg){
			return productImage(mainimg, secimg).then(buffers => {
				let s3 = new aws.S3({
					accessKeyId: req.app.get('S3_ID'),
					secretAccessKey: req.app.get('S3_SECRET_KEY'),
				})
				let uploads = [
					s3.upload(awsHelper.uploadS3(buffers[0], `products/lg/${realProduct.plu}.jpg`)).promise(),
					s3.upload(awsHelper.uploadS3(buffers[1], `products/md/${realProduct.plu}.jpg`)).promise(),
					s3.upload(awsHelper.uploadS3(buffers[2], `products/sm/${realProduct.plu}.jpg`)).promise(),
					s3.upload(awsHelper.uploadS3(buffers[3], `products/xs/${realProduct.plu}.jpg`)).promise(),
					s3.upload(awsHelper.uploadS3(buffers[4], `products/xxs/${realProduct.plu}.jpg`)).promise(),

					s3.upload(awsHelper.uploadS3(buffers[5], `products/lg/${realProduct.plu}_2.jpg`)).promise(),
					s3.upload(awsHelper.uploadS3(buffers[6], `products/md/${realProduct.plu}_2.jpg`)).promise(),
					s3.upload(awsHelper.uploadS3(buffers[7], `products/sm/${realProduct.plu}_2.jpg`)).promise(),
					s3.upload(awsHelper.uploadS3(buffers[8], `products/xs/${realProduct.plu}_2.jpg`)).promise(),
					s3.upload(awsHelper.uploadS3(buffers[9], `products/xxs/${realProduct.plu}_2.jpg`)).promise(),
				]

				return Promise.all(uploads)
			})
		}
		return procates
	}).then(data => {
		res.sendStatus(200)
	}).catch(next)
})

module.exports = router
