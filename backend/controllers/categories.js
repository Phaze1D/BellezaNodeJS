var express = require('express')
var router = express.Router()
var Sequelize = require('sequelize');
var Category = require('../models').Category


router.get('/categories', function (req, res) {
  Category.findAll({
    where: {parent_id: {$ne: null}},
    include: [{
        model: Category,
        as: 'subs',
        where: { id: Sequelize.col('subs.parent_id') }
    }]
  }).then(categories => {
    Category.findAll({
      where: {parent_id: null}
    }).then(parents => {
      var response = {parents: parents, subs: categories}
      res.json(response)
    })
  })
})

module.exports = router
