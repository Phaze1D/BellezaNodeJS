'use strict'
let express = require('express')
let multer = require('multer')
let Address = require('../models').Address
let middware = require('../middleware/user.js')
let isLogin = middware.isLogin
let isUser = middware.isUser
let upload = multer()
let router = express.Router()

let addressFieldsNew = [
  'first_name',
  'last_name',
  'telephone',
  'street',
  'street2',
  'city',
  'state',
  'zipcode',
  'country',
  'user_id'
]

let addressFieldsUpdate = [
  'first_name',
  'last_name',
  'telephone',
  'street',
  'street2',
  'city',
  'state',
  'zipcode',
  'country'
]

/** REQUIRES USER VALIDATION */
router.get('/user/:user_id/addresses', isLogin, isUser, function (req, res, next) {
  Address.findAll({where: {user_id: req.params.user_id}}).then(addresses => {
    res.json(addresses)
  }).catch(next)
})

/** REQUIRES USER VALIDATION */
router.post('/user/:user_id/address', isLogin, isUser, upload.none(), function (req, res, next) {
  let formData = req.body
  formData.user_id = req.params.user_id
  Address.create(req.body, {fields: addressFieldsNew}).then(address => {
    res.json(address)
  }).catch(next)
})

/** REQUIRES USER VALIDATION */
router.put('/user/:user_id/address/:id', isLogin, isUser, upload.none(), function (req, res, next) {
  Address.findOne({where: {id: req.params.id, user_id: req.params.user_id}})
  .then( address => {
    if(address){
      return address.update(req.body, {fields: addressFieldsUpdate})
    }else{
      res.sendStatus(401)
    }
  }).then(address => {
    res.json(address)
  }).catch(next)
})

/** REQUIRES LOGIN VALIDATION */
router.get('/validate-address', isLogin, function (req, res, next) {
  let address = Address.build(req.query, {fields: [Object.keys(req.query)[0]]})
  address.validate({fields: [Object.keys(req.query)[0]]}).then((err) => {
    if(err){
      next(err)
    }else{
      res.sendStatus(200)
    }
  }).catch(next)
})

/** REQUIRES USER VALIDATION */
router.delete('/user/:user_id/address/:id', isLogin, isUser, function (req, res, next) {
  Address.findOne({where: {id: req.params.id, user_id: req.params.user_id}})
  .then( address => {
    if(address){
      return address.destroy({ force: true })
    }else{
      res.sendStatus(401)
    }
  }).then( () => {
    res.sendStatus(200)
  }).catch(next)
})


module.exports = router
