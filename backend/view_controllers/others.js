'use strict'
import express from 'express'
import Sequelize from 'sequelize'
import React from 'react'
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import promise from "redux-promise-middleware"
import Immutable, { fromJS } from 'immutable'
import { renderToString } from 'react-dom/server'
import models from '../models'
import { getReducers } from 'reducers'
import { ServerRoutes } from 'utils/routes'


let Banner = models.Banner
let Category = models.Category
let Product = models.Product
let router = express.Router()


router.get('/home', function (req, res, next) {
  let promises = [
    Category.formattedAll(),
    Banner.carouselImages(),
    Product.favorites()
  ]

  Promise.all(promises).then(resultes => {
    let middleware = applyMiddleware(promise({promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']}))
    const preloadState = Immutable.Record({
      categories: fromJS(resultes[0]),
      cart: undefined,
      products: fromJS(resultes[2]),
      product: undefined,
      user: undefined,
      others: fromJS({banners: resultes[1]}),
      orders: undefined,
      codes: undefined,
      order: undefined,
      clients: undefined,
      client: undefined,
      errors: undefined,
      fetching: undefined
    });

    let store = createStore(getReducers(preloadState), middleware)

    const html = renderToString(
      <Provider store={store}>
        <ServerRoutes url={req.url} />
      </Provider>
    )

    res.render('index', {html: html, setWindow: `
      <script type="text/javascript">
      window.__PRELOADED_STATE__ = ${JSON.stringify( (new preloadState()).toJSON() ).replace(/</g, '\\u003c')}
      </script>
    `})
  }).catch(err => {
    console.log(err);
  })
})


module.exports = router
