'use strict'
let express = require('express')
let Order = require('../models').Order
let middware = require('../middleware/user.js')

let isLogin = middware.isLogin
let isAdmin = middware.isAdmin
let router = express.Router()


/** REQUIRES ADMIN VALIDATION */
router.get('/orders', isLogin, isAdmin, function (req, res, next) {
  Order.findAndCountAll(Order.allOptions(req.query)).then(results => {
    res.json(results)
  }).catch(next)
})

/** REQUIRES USER OR ADMIN VALIDATION */
router.get('/user/:user_id/orders', isLogin, isAdmin, function (req, res, next) {
  Order.findAndCountAll(Order.userAllOptions(req.query, req.params.user_id))
  .then(results => {
    res.json(results)
  }).catch(next)
})

/** REQUIRES USER OR ADMIN VALIDATION */
router.get('/user/:user_id/order/:id', isLogin, isAdmin, function (req, res, next) {
  Order.findOne({where: {id: req.params.id, user_id: req.params.user_id}})
  .then(order => {
    if(order){
      res.json(order)
    }else{
      res.sendStatus(401)
    }
  }).catch(next)
})

module.exports = router
