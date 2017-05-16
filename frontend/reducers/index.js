import { combineReducers } from "redux"
import reduceReducers from "reduce-reducers"

import {
  getCategoriesReducer,
} from 'reducers/categories'

import {
  getProductsReducer,
  resetProductsReducer,
  getProductReducer,
  resetProductReducer
} from 'reducers/products'

import { addDetailReducer } from 'reducers/cart'

const categoriesReducer = reduceReducers(
  getCategoriesReducer,
)

const productsReducer = reduceReducers(
  getProductsReducer,
  resetProductsReducer
)

const productReducer = reduceReducers(
  getProductReducer,
  resetProductReducer
)

const cartReducer = reduceReducers(
  addDetailReducer,
)

export default combineReducers({
  categories: categoriesReducer,
  cart: cartReducer,
  products: productsReducer,
  product: productReducer
})
