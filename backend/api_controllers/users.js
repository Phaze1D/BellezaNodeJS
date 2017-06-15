'use strict'
let express = require('express')
let multer = require('multer')
let User = require('../models').User
let Sequelize = require('sequelize')
var bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let middware = require('../middleware/user.js')

let isLogin = middware.isLogin
let isUser = middware.isUser
let upload = multer()
let router = express.Router()

router.post('/user', upload.none(), function (req, res, next) {
  User.create(req.body, {fields: ['first_name', 'last_name', 'email', 'password']})
  .then(user => {
    let ru = user.toJSON()
    let token =  jwt.sign({ userId:  ru.id, isAdmin: ru.admin}, req.app.get('SECRET'));
    delete ru.password
    ru.addresses = []
    res.append('Authorization', `Bearer ${token}`)
    res.json(ru);
  }).catch(next)
})


router.post('/login', upload.none(), function (req, res, next) {
  User.findLogin(req.body.email).then( user => {
    if(user){
      bcrypt.compare(req.body.password, user.password).then((correct) => {
        if(correct){
          let ru = user.toJSON()
          let token =  jwt.sign({ userId:  ru.id, isAdmin: ru.admin}, req.app.get('SECRET'));
          delete ru.password
          res.append('Authorization', `Bearer ${token}`)
          res.json(ru)
        }else{
          let err = new Sequelize.ValidationError('')
          err.errors.push({path: 'login', message: 'El correo y la contraseña que has introducido no coinciden.'})
          next(err)
        }
      })
    }else{
      let err = new Sequelize.ValidationError('')
      err.errors.push({path: 'login', message: 'El correo y la contraseña que has introducido no coinciden.'})
      next(err)
    }
  }).catch(next)
})


router.get('/validate-user', function (req, res, next) {
  let user = User.build(req.query, {fields: [Object.keys(req.query)[0]]})
  user.validate({fields: [Object.keys(req.query)[0]]}).then((err) => {
    if(err){
      next(err)
    }else{
      res.sendStatus(200)
    }
  }).catch(next)
})

/** REQUIRES USER VALIDATION */
router.put('/user/:user_id', isLogin, isUser, upload.none(), function (req, res, next) {
  User.findById(req.params.user_id, {rejectOnEmpty: true}).then(user => {
    return user.update(req.body, {fields: ['first_name', 'last_name', 'telephone']})
  }).then((user) => {
    let ru = user.toJSON()
    delete ru.password
    ru.addresses = []
    res.json(ru);
  }).catch(next)
})

module.exports = router
