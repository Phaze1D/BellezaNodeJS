"use strict"
let Sequelize = require("sequelize")



const errorMiddleware = (err, req, res, next) => {
	console.log(err)
	if(err.type === "processing_error"){
		let cerr = new Sequelize.ValidationError("")
		cerr.errors.push({path: "card_token", message: err.details[0].message})
		res.status(422).json(cerr.errors)
	}else if(err.type === "parameter_validation_error"){
		let cerr = new Sequelize.ValidationError("")
		cerr.errors.push({path: "parameter", message: err.details[0].debug_message})
		res.status(422).json(cerr.errors)
	}else if(err.name === "SequelizeValidationError"){
		res.status(422).json(err.errors)
	}else if(err.name === "SequelizeEmptyResultError"){
		res.status(404).json(err.errors)
	}else if(err.name === "VerificationError"){
		res.status(401).json(err)
	}else{
		next(err)
	}
}


module.exports = errorMiddleware
