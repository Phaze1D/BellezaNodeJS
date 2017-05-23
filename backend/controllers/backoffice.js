'use strict'
let express = require('express')
let multer = require('multer')
let models = require('../models')
let Banner = models.Banner
let Mailing = models.Mailing

let upload = multer()
let router = express.Router()


let bannerFields = [
  'link_to',
  'manual_active',
  'start_date',
  'end_date'
]

/** REQUIRES ADMIN VALIDATION */
router.get('/banners', function (req, res, next) {
  let page = req.query.page ? req.query.page : 0
  Banner.findAndCountAll({offset: 20*page, limit: 20}).then(results => {
    res.json(results)
  }).catch(next)
})

/** REQUIRES ADMIN VALIDATION */
router.get('/banner/:id', function (req, res, next) {
  Banner.findById(req.params.id).then(banner => {
    res.json(banner)
  }).catch(next)
})

/** REQUIRES ADMIN VALIDATION */
router.post('/banner', upload.none(), function (req, res, next) {
  Banner.create(req.body, {fields: bannerFields}).then(banner => {
    res.json(banner)
  }).catch(next)
})

/** REQUIRES ADMIN VALIDATION */
router.put('/banner/:id', upload.none(), function (req, res, next) {
  Banner.findById(req.params.id).then(banner => {
    return banner.update(req.body, {fields: bannerFields})
  }).then(banner => {
    res.json(banner)
  }).catch(next)
})

/** REQUIRES ADMIN VALIDATION */
router.get('/mailing', function (req, res, next) {
  let page = req.query.page ? req.query.page : 0
  Mailing.findAndCountAll({offset: 20*page, limit: 20}).then(results => {
    res.json(results)
  }).catch(next)
})

module.exports = router
