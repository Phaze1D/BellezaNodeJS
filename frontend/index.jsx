import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { applyMiddleware, createStore } from "redux"
import promise from "redux-promise-middleware"
import { Routes } from "utils/routes"
import { getReducers } from "reducers"
import Immutable, {fromJS} from "immutable"

import "index.sass"
import "@material/menu/dist/mdc.menu.css"


require.ensure([], function (require) {
	require("utils/conekta.js")
})

let middleware = null

let preloadState = undefined
if(window.__PRELOADED_STATE__){
	preloadState = Immutable.Record({
		categories: fromJS(window.__PRELOADED_STATE__.categories),
		cart: undefined,
		products: fromJS(window.__PRELOADED_STATE__.products),
		product: fromJS(window.__PRELOADED_STATE__.product),
		user: undefined,
		others: fromJS(window.__PRELOADED_STATE__.others),
		orders: undefined,
		codes: undefined,
		order: undefined,
		clients: undefined,
		client: undefined,
		errors: undefined,
		fetching: undefined
	})
}

if(process.env.NODE_ENV === "production"){
	middleware = applyMiddleware( promise({promiseTypeSuffixes: ["LOADING", "SUCCESS", "ERROR"]}))
}else {
	var logger = require("redux-logger").createLogger
	middleware = applyMiddleware(logger(), promise({promiseTypeSuffixes: ["LOADING", "SUCCESS", "ERROR"]}))
}

const store = createStore(getReducers(preloadState), middleware)

ReactDOM.render(
	<Provider store={store}><Routes/></Provider>,
	document.getElementById("app")
)
