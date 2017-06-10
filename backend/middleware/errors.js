'use strict'


const errorMiddleware = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      res.status(422).json(err.errors)
      break;

    case "SequelizeEmptyResultError":
      res.status(404).json(err)
      break;

    default:
      next(err)
  }
}


module.exports = errorMiddleware
