'use strict'
let express = require('express')
let multer = require('multer')
let Address = require('../models').Address

let upload = multer()
let router = express.Router()

let addressFields = [
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

/** REQUIRES USER VALIDATION */
router.post('/address', upload.none(), function (req, res, next) {
  Address.create(req.body, {fields: addressFields}).then(address => {
    res.json(address)
  }).catch(next)
})

/** REQUIRES USER VALIDATION */
router.put('/address/:id', upload.none(), function (req, res, next) {
  Address.findById(req.params.id).then( address => {
    return address.update(req.body, {fields: addressFields})
  }).then(address => {
    res.json(address)
  }).catch(next)
})

/** REQUIRES USER VALIDATION */
router.get('/validate-address', function (req, res) {
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
router.delete('/address/:id', function (req, res, next) {
  Address.findById(req.params.id).then( address => {
    return address.destroy({ force: true })
  }).then( () => {
    res.sendStatus(200)
  }).catch(next)
})


module.exports = router
