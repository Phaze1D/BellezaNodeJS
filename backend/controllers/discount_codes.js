'use strict'
let express = require('express')
let models = require('../models')
let DiscountCode = models.DiscountCode
let User = models.User
let multer = require('multer')
let middware = require('../middleware/user.js')

let isLogin = middware.isLogin
let isAdmin = middware.isAdmin
let isUser = middware.isUser
let upload = multer()
let router = express.Router()

let codeFields = [
  'code',
  'expires_date',
  'discount',
  'is_percentage',
  'user_id'
]


/** REQUIRES ADMIN OR USER VALIDATION */
router.get('/user/:user_id/codes', isLogin, isAdmin, function (req, res, next) {
  DiscountCode.findAll({where: {user_id: req.params.user_id}}).then( codes => {
    res.json(codes)
  }).catch(next)
})

/** REQUIRES USER VALIDATION */
router.get('/user/:user_id/check-code', isLogin, isUser, function (req, res, next) {
  DiscountCode.findOne({where: {code: req.query.code, user_id: req.params.user_id}})
  .then( discountCode => {
    if(discountCode){
      res.json(discountCode)
    }else{
      res.sendStatus(401)
    }
  }).catch(next)
})

/** REQUIRES ADMIN VALIDATION */
router.post('/user/:client_id/code', isLogin, isAdmin, upload.none(), function (req, res, next) {
  let formData = req.body
  formData.user_id = req.params.client_id
  User.findOne({where: {id: req.params.client_id}}).then(user => {
    if(user){
      return DiscountCode.create(formData, {fields: codeFields})
    }else{
      res.sendStatus(401)
    }
  }).then(code => {
    res.json(code)
  }).catch(next)
})

module.exports = router
