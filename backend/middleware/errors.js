'use strict'


const validationError = (res, err) => {
  res.status(422).json(err.errors)
}

const errorMiddleware = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      validationError(res, err)
      break;
    default:
      next(err)
  }
}


module.exports = errorMiddleware
