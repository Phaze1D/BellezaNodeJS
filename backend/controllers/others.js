'use strict'
let express = require('express')
let multer = require('multer')
let Mailing = require('../models').Mailing

let upload = multer()
let router = express.Router()


router.post('/contact', upload.none(), function (req, res, next) {
  res.sendStatus(500)
})


router.get('/validate-contact', function (req, res, next) {
  res.sendStatus(500)
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
