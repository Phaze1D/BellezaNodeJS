'use strict'
let express = require('express')
let multer = require('multer')
let models = require('../models')
let middware = require('../middleware/user.js')

let isLogin = middware.isLogin
let isAdmin = middware.isAdmin
let Banner = models.Banner
let Mailing = models.Mailing
let User = models.User
let upload = multer()
let router = express.Router()


let bannerFields = [
  'link_to',
  'manual_active',
  'start_date',
  'end_date'
]

router.get('/banners', isLogin, isAdmin, function (req, res, next) {
  let page = req.query.page ? req.query.page : 0
  Banner.findAndCountAll({offset: 20*page, limit: 20}).then(results => {
    res.json(results)
  }).catch(next)
})

router.get('/banner/:id', isLogin, isAdmin, function (req, res, next) {
  Banner.findById(req.params.id).then(banner => {
    res.json(banner)
  }).catch(next)
})

router.post('/banner', isLogin, isAdmin, upload.none(), function (req, res, next) {
  Banner.create(req.body, {fields: bannerFields}).then(banner => {
    res.json(banner)
  }).catch(next)
})

router.put('/banner/:id', isLogin, isAdmin, upload.none(), function (req, res, next) {
  Banner.findById(req.params.id).then(banner => {
    return banner.update(req.body, {fields: bannerFields})
  }).then(banner => {
    res.json(banner)
  }).catch(next)
})

router.get('/mailing', isLogin, isAdmin, function (req, res, next) {
  let page = req.query.page ? req.query.page : 0
  Mailing.findAndCountAll({offset: 20*page, limit: 20}).then(results => {
    res.json(results)
  }).catch(next)
})

router.get('/clients',isLogin, isAdmin, function (req, res, next) {
  let page = req.query.page ? req.query.page : 0
  User.findAndCountAll({offset: 20*page, limit: 20}).then(results => {
    res.json(results)
  }).catch(next)
})

router.get('/client/:client_id',isLogin, isAdmin, function (req, res, next) {
  User.findOne({where: {id: req.params.client_id}, attributes: ['first_name', 'last_name', 'id', 'email']})
  .then(client => {
    if(client){
      res.json(client)
    }else{
      res.sendStatus(401)
    }
  })
})

module.exports = router
