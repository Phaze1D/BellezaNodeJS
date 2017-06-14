'use strict'
let express = require('express')
let multer = require('multer')
let models = require('../models')
let Mailing = models.Mailing
let Banner = models.Banner

let upload = multer()
let router = express.Router()

router.get('/carousel', function (req, res, next) {
  Banner.carouselImages().then(banners => {
    res.json(banners)
  }).catch(next)
})

router.post('/addmailer', upload.none(), function (req, res, next) {
  Mailing.findOne({where: {email: req.body.email}}).then(mailer => {
    if(mailer){
      let jsM = mailer.toJSON()
      return mailer.update({active: req.body.active}, {fields: ['active']})
    }else{
      return Mailing.create(req.body, {fields: ['active', 'email']})
    }
  }).then(mailer => {
    res.json(mailer)
  }).catch(next)

})


module.exports = router
