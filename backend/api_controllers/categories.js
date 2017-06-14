'use strict'
let express = require('express')
let router = express.Router()
let Sequelize = require('sequelize');
let Category = require('../models').Category


router.get('/categories', function (req, res) {
  Category.formattedAll().then(categories => {
    res.set({ 'Cache-Control': 'max-age=350000'}).json(categories)
  })
})

module.exports = router
