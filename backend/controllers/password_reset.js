'use strict'
let express = require('express')
let multer = require('multer')
let crypto = require('crypto')
let User = require('../models').User

let upload = multer()
let router = express.Router()


router.post('/passwordreset', upload.none(), function (req, res, next) {
  User.findOne({where: {email: req.body.email}}).then(user => {
    if(user){
      let token = randomBytes(48).toString('hex');
      user.update({password_reset_token: token, password_reset_date: Date.now() + 3600000})
      .then( user => {
        //Missing Send Email

        res.sendStatus(200)
      })
    }else{
      let err = new Sequelize.ValidationError('Correo electrónico no registrado')
      err.errors.push({path: 'email', message: 'Correo electrónico no registrado'})
      next(err)
    }
  }).catch(next)
})


module.exports = router
