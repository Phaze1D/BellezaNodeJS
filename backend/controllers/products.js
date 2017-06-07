'use strict'
let express = require('express')
let router = express.Router()
let Sequelize = require('sequelize')
let multer = require('multer')
let models = require('../models')
let middware = require('../middleware/user.js')

let isLogin = middware.isLogin
let isAdmin = middware.isAdmin
const Product = models.Product
const Category = models.Category
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


router.get('/products', function (req, res, next) {
  Product.findAndCountAll(Product.allOptions(req.query, true)).then( results => {
    res.json(results)
  }).catch(next)
})

router.get('/favProducts', function (req, res, next) {
  Product.findAndCountAll({where: {fav: true, active: true}}).then( results => {
    res.json(results)
  }).catch(next)
})

router.get('/product/:id', function (req, res, next) {
  Product.findOne(Product.singleOptions(req.params.id)).then(product => {
    let category_id = product.categories.length > 0 ? product.categories[0].id : undefined
    Product.findAll(Product.relatedOptions(category_id)).then(related => {
      let pro = product.toJSON();
      pro.related = related
      res.json(pro)
    }).catch(next)
  }).catch(next)

})

router.get('/backoffice/products', isLogin, isAdmin, function (req, res, next) {
  Product.findAndCountAll(Product.allOptions(req.query)).then( results => {
    res.json(results)
  }).catch(next)
})

router.post('/product', isLogin, isAdmin, upload.none(), function (req, res, next) {
  Product.create(req.body, {fields: productFields}).then(product => {
    res.json(product)
  }).catch(next)
})

router.put('/product/:id', isLogin, isAdmin, upload.none(), function (req, res, next) {
  Product.findById(req.params.id).then(product => {
    return product.update(req.body, {fields: productFields.slice(1)})
  }).then(product => {
    return product.setCategories(req.body.categories)
  }).then(product => {
    res.json(product)
  }).catch(next)
})

module.exports = router
