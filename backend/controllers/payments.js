'use strict'
let express = require('express')
let multer = require('multer')
let isLogin = require('../middleware/user.js').isLogin

let router = express.Router()
let upload = multer()



/** REQUIRES USER VALIDATION */
router.post('/payment/card', isLogin, upload.none(), function (req, res) {

})

/** REQUIRES USER VALIDATION */
router.post('/payment/cash', isLogin, upload.none(), function (req, res) {

})
