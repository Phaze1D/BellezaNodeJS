'use strict'
let jwt = require('jsonwebtoken');


const isLogin = function (req, res, next) {
  let authHeader = req.get('Authorization')
  if(authHeader){
    let split = authHeader.split(' ')
    try {
      var decoded = jwt.verify(split[1], 'SECRET');
      req.jwtUser = decoded
      next()
    } catch (e) {
      res.sendStatus(401)
    }
  } else {
   res.sendStatus(401)
  }
}

const isAdmin = function (req, res, next) {
  if(req.jwtUser && (req.jwtUser.isAdmin || req.jwtUser.userId === req.params.user_id)){
    next()
  }else{
    res.sendStatus(401)
  }
}

const isUser = function (req, res, next) {
  if(req.jwtUser && req.jwtUser.userId === req.params.user_id){
    next()
  }else{
    res.sendStatus(401)
  }
}

module.exports = {
  isLogin: isLogin,
  isAdmin: isAdmin,
  isUser: isUser
}
