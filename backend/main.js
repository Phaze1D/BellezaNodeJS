'use strict'
require('dotenv').config()
let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let apiControllers = require('./api_controllers')
let viewControllers = require('./view_controllers')
let errorMiddleware = require('./middleware/errors.js')
let exphbs  = require('express-handlebars')
let hbsHelper = require('./helpers/handlebars.js')
let compression = require('compression')
let helmet = require('helmet')

let app = express()
let hbs = exphbs.create(hbsHelper)

app.set('SECRET', process.env.SECRET)
app.set('CONEKTA', process.env.CONEKTA)
app.set('S3_SECRET_KEY', process.env.S3_SECRET_KEY)
app.set('S3_ID', process.env.S3_ID)
app.set('SES_ID', process.env.SES_ID)
app.set('SES_SECRET_KEY', process.env.SES_SECRET_KEY)
app.set('SES_REGION', process.env.SES_REGION)

app.set('views', path.resolve(__dirname, 'views'))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.enable('trust proxy')

app.use(compression())
app.use(helmet())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

for (let key in apiControllers) {
	if (apiControllers.hasOwnProperty(key)) {
		app.use('/api', apiControllers[key], errorMiddleware)
	}
}

for (let key in viewControllers) {
	if (viewControllers.hasOwnProperty(key)) {
		app.use('/', viewControllers[key])
	}
}

app.get('/', function (req, res) {
	res.redirect('/home')
})

app.use(function(req, res) {
	res.redirect('/home')
})

app.listen(8081)
