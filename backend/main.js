'use strict'
let express = require('express')
let path = require("path")
let bodyParser = require('body-parser')
let controllers = require('./controllers')
let errorHandlers = require('./helpers/errorHandlers.js')



let app = express()


app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

for (var key in controllers) {
  if (controllers.hasOwnProperty(key)) {
    app.use('/', controllers[key])
  }
}

app.use(errorHandlers)


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/../index.html'))
})

app.listen(8080, function () {
  console.log('Example app listening on port 3000!')
})
