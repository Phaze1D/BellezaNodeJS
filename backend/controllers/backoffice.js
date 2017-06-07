'use strict'
let express = require('express')
let multer = require('multer')
let models = require('../models')
let middware = require('../middleware/user.js')
let aws = require('aws-sdk');
let awsHelper = require('../helpers/aws.js')
let bannerImage = require('../helpers/validationMessages.js').bannerImage


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

let bannerImagesFields = [
  {name: 'imagelg'},
  {name: 'imagesm'}
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

router.post('/banner', isLogin, isAdmin, upload.fields(bannerImagesFields), function (req, res, next) {
  bannerImage(req.files.imagelg[0].buffer, req.files.imagesm[0].buffer)
  .then(values => {
    return Banner.create(req.body, {fields: bannerFields})
  }).then(banner => {
    let s3 = new aws.S3({
      accessKeyId: req.app.get('S3_ID'),
      secretAccessKey: req.app.get('S3_SECRET_KEY'),
    })
    let plg = s3.upload(awsHelper.uploadBanner(req.files.imagelg[0].buffer, `${banner.id}_lg.jpg`))
    let psm = s3.upload(awsHelper.uploadBanner(req.files.imagesm[0].buffer, `${banner.id}_sm.jpg`))
    return Promise.all([plg.promise(), psm.promise()])
  }).then(data => {
    res.sendStatus(200)
  }).catch(next)
})


router.put('/banner/:id', isLogin, isAdmin, upload.none(), function (req, res, next) {
  Banner.findById(req.params.id).then(banner => {
    return banner.update(req.body, {fields: bannerFields})
  }).then(banner => {
    res.json(banner)
  }).catch(next)
})

router.delete('/banner/:id', isLogin, isAdmin, function (req, res, next) {
  Banner.findById(req.params.id).then(banner => {
    if(banner){
      return banner.destroy({ force: true })
    }else{
      res.sendStatus(401)
    }
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
