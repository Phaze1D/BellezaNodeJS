'use strict'
let express = require('express')
let router = express.Router()
let Sequelize = require('sequelize');
let Category = require('../models').Category


router.get('/categories', function (req, res) {
  Category.formattedAll().then(categories => {
    res.json(categories)
  })
})

module.exports = router
