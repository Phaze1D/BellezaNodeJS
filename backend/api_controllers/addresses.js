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

router.get('/user/:user_id/addresses', isLogin, isUser, function (req, res, next) {
  Address.userAddresses(req.params.user_id).then(addresses => {
    res.json(addresses)
  }).catch(next)
})

router.post('/user/:user_id/address', isLogin, isUser, upload.none(), function (req, res, next) {
  let formData = req.body
  formData.user_id = req.params.user_id
  Address.create(req.body, {fields: addressFieldsNew}).then(address => {
    res.json(address)
  }).catch(next)
})

router.put('/user/:user_id/address/:id', isLogin, isUser, upload.none(), function (req, res, next) {
  Address.userAddress(req.params.id, req.params.user_id).then( address => {
    return address.update(req.body, {fields: addressFieldsUpdate})
  }).then(address => {
    res.json(address)
  }).catch(next)
})

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

router.delete('/user/:user_id/address/:id', isLogin, isUser, function (req, res, next) {
  Address.userAddress(req.params.id, req.params.user_id).then( address => {
    return address.destroy({ force: true })
  }).then( () => {
    res.sendStatus(200)
  }).catch(next)
})


module.exports = router
