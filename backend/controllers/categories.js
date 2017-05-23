'use strict'
let express = require('express')
let router = express.Router()
let Sequelize = require('sequelize');
let Category = require('../models').Category


router.get('/categories', function (req, res) {
  Category.findAll({
    include: [{
        model: Category,
        as: 'subs',
        where: {
          id: Sequelize.col('subs.parent_id'),
         },
        include: [{
          model: Category,
          as: 'subs',
          where: { id: Sequelize.col('subs.parent_id') }
        }]
    }]
  }).then(categories => {
    res.json(categories)
  })
})

module.exports = router
