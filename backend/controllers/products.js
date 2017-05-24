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
  'active'
]


router.get('/products', function (req, res, next) {
  Product.findAndCountAll(Product.allOptions(req.query)).then( results => {
    res.json(results)
  }).catch(next)
})

router.get('/product/:id', function (req, res, next) {
  Product.findOne(Product.singleOptions(req.params.id)).then(product => {
    let category_id = product.categories[0].id
    Product.findAll(Product.relatedOptions(category_id)).then(related => {
      let pro = product.toJSON();
      pro.related = related
      res.json(pro)
    }).catch(next)
  }).catch(next)

})

/** REQUIRES ADMIN VALIDATION */
router.post('/product', isLogin, isAdmin, upload.none(), function (req, res, next) {
  Product.create(req.body, {fields: productFields}).then(product => {
    res.json(product)
  }).catch(next)
})

/** REQUIRES ADMIN VALIDATION */
router.put('/product/:id', isLogin, isAdmin, upload.none(), function (req, res, next) {
  Product.findById(req.params.id).then(product => {
    return product.update(req.body, {fields: productFields})
  }).then(product => {
    res.json(product)
  }).catch(next)
})

module.exports = router
