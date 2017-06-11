'use strict'
let Sequelize = require('sequelize')



const errorMiddleware = (err, req, res, next) => {
  if(err.type === "processing_error"){
    let cerr = new Sequelize.ValidationError('')
    cerr.errors.push({path: 'card_token', message: err.details[0].message})
    res.status(422).json(cerr.errors)
  }

  if(err.name === "SequelizeValidationError"){
    res.status(422).json(err.errors)
  }

  if(err.name === "SequelizeEmptyResultError"){
    res.status(404).json(err.errors)
  }

  if(err.name === "VerificationError"){
    res.status(401).json(err)
  }

  next(err)
}


module.exports = errorMiddleware
