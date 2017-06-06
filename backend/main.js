'use strict'
let express = require('express')
let path = require("path")
let bodyParser = require('body-parser')
let controllers = require('./controllers')
let errorMiddleware = require('./middleware/errors.js')
let app = express()

app.set('SECRET', 'shhhh')
app.set('CONEKTA', 'key_oF4vKY43ZW7romYgdv5wNw')
app.set('S3_SECRET_KEY', '5HNRr765wUlO4feBTuHVuSbRASMIalIMh+eHi+U4')
app.set('S3_ID', 'AKIAIM3QDCFQJONTWL7Q')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

for (var key in controllers) {
  if (controllers.hasOwnProperty(key)) {
    app.use('/', controllers[key])
  }
}

app.use(errorMiddleware)


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/../index.html'))
})

app.listen(8080, function () {
  console.log('Example app listening on port 3000!')
})
