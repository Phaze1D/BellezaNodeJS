'use strict'
let React = require('react')
let Provider = require("react-redux").Provider
let createStore = require("redux").createStore
let applyMiddleware = require("redux").applyMiddleware
let promise = require("redux-promise-middleware").default
let fromJS = require('immutable').fromJS
let Immutable = require('immutable')
let renderToString = require('react-dom/server').renderToString
let getReducers = require('reducers').getReducers
let ServerRoutes = require('utils/routes').ServerRoutes


module.exports = function (promises, map, url) {
  return Promise.all(promises).then(results => {
    let middleware = applyMiddleware(promise({promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']}))

    if(results[map['categories']]){
      results[map['categories']] = results[map['categories']].map(resu => resu.toJSON())
    }

    if(results[map['products']]){
      results[map['products']].rows = results[map['products']].rows.map(resu => resu.toJSON())
    }

    if(results[map['banners']]){
      results[map['banners']].rows = results[map['banners']].rows.map(resu => resu.toJSON())
    }

    if(results[map['product']]){
      results[map['product']] = results[map['product']].toJSON()
      results[map['product']].related = results[map['related']].map(resu => resu.toJSON())
    }


    const preloadState = Immutable.Record({
      categories: fromJS(results[map['categories']]),
      cart: undefined,
      products: fromJS(results[map['products']]),
      product: fromJS(results[map['product']]),
      user: undefined,
      others: fromJS({banners: results[map['banners']], mailing: {rows: [], count: 0}}),
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
        <ServerRoutes url={url} />
      </Provider>
    )

    return {html: html, setWindow: `
      <script type="text/javascript">
      window.__PRELOADED_STATE__ = ${JSON.stringify( (new preloadState()).toJSON() ).replace(/</g, '\\u003c')}
      </script>
    `}
  })
}
