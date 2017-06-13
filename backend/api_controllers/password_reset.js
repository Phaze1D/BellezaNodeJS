'use strict'
let express = require('express')
let multer = require('multer')
let crypto = require('crypto')
let Sequelize = require('sequelize')
let User = require('../models').User
let emailSender = require('../helpers/emailSender.js')


let upload = multer()
let router = express.Router()


router.post('/passwordreset', upload.none(), function (req, res, next) {
  User.findOne({where: {email: req.body.email}}).then(user => {
    if(user){
      let token = crypto.randomBytes(48).toString('hex');
      user.update({password_reset_token: token, password_reset_date: Date.now() + 3600000})
      .then( user => {

        let info = {
          name: user.first_name + " " + user.last_name,
          action_url: "http://localhost:3000/passwordreset/"+token,
          support_url: "http://localhost:3000"
        }

        req.app.render('password_reset', info, function (err, html) {
          if(err) next(err);
          res.sendStatus(200)

          let sesConfig = {
            accessKeyId: req.app.get('SES_ID'),
            secretAccessKey: req.app.get('SES_SECRET_KEY'),
            region: req.app.get('SES_REGION')
          }
          emailSender.sendEmail(user.toJSON().email, html, sesConfig, "Restablecimiento de Contraseña")
        })
      })
    }else{
      let err = new Sequelize.ValidationError('Correo electrónico no registrado')
      err.errors.push({path: 'email', message: 'Correo electrónico no registrado'})
      next(err)
    }
  }).catch(next)
})

router.get('/passwordreset/:token', function (req, res, next) {

  res.sendStatus(200)
})


module.exports = router
