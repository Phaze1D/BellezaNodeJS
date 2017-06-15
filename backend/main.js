'use strict'
let express = require('express')
let path = require("path")
let bodyParser = require('body-parser')
let apiControllers = require('./api_controllers')
let viewControllers = require('./view_controllers')
let errorMiddleware = require('./middleware/errors.js')
let exphbs  = require('express-handlebars');
let hbsHelper = require('./helpers/handlebars.js')
let compression = require('compression')
let helmet = require('helmet')


let app = express()

// var delay = require('express-delay');
// app.use(delay(500));

let hbs = exphbs.create(hbsHelper);

app.set('SECRET', 'shhhh')
app.set('CONEKTA', 'key_oF4vKY43ZW7romYgdv5wNw')
app.set('S3_SECRET_KEY', '3sYfiULN8xaCeYkOxgsfKv8FCNDnFDj5EWioFsC7')
app.set('S3_ID', 'AKIAIYQSKGZYKDUBKBZQ')
app.set('SES_ID', 'AKIAJ5ALUYF33JD2JBVA')
app.set('SES_SECRET_KEY', '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')
app.set('SES_REGION', 'us-west-2')

app.set('views', __dirname + '/views')
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

app.use(compression())
app.use(helmet())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

for (var key in apiControllers) {
  if (apiControllers.hasOwnProperty(key)) {
    app.use('/api', apiControllers[key], errorMiddleware)
  }
}

for (var key in viewControllers) {
  if (viewControllers.hasOwnProperty(key)) {
    app.use('/', viewControllers[key])
  }
}

app.get('/', function (req, res) {
  res.redirect('/home');
})

app.listen(8080, function () {
  console.log('Example app listening on port 3000!')
})

/*
/passwordreset
/stores
*/
