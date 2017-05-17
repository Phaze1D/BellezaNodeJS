import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import promise from "redux-promise-middleware"
import { Routes } from 'utils/routes'
import reducers from 'reducers'
import Immutable from 'immutable'

import 'index.sass'

let middleware = null

if(process.env.NODE_ENV === 'production'){
  middleware = applyMiddleware( promise({promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']}))
}else {
  var logger = require('redux-logger').createLogger
  middleware = applyMiddleware(logger(), promise({promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']}))
}

const store = createStore(reducers, middleware)

ReactDOM.render(
  <Provider store={store}><Routes/></Provider>,
  document.getElementById('app')
)
