import { combineReducers } from "redux-immutable"
import reduceReducers from "reduce-reducers"
import Immutable from 'immutable'


import {
  getCategoriesReducer,
} from 'reducers/category'

import {
  getProductsReducer,
  resetProductsReducer,
  getProductReducer,
  resetProductReducer
} from 'reducers/product'

import {
  addDetailReducer,
  hideCartReducer,
  changeQuantityReducer,
  removeDetailReducer
 } from 'reducers/cart'

import {
  userSignUpReducer,
  userLoginReducer,
  validateUserNewReducer,
  userUpdateReducer,
  validateUserUpdateReducer,
  userPreferenceReducer,
  resetUserErrorsReducer,
  userLogoutReducer
} from 'reducers/user'

import {
  contactReducer,
  validateContactReducer,
  resetOthersErrorsReducer
} from 'reducers/others'

import {
  addressNewReducer,
  addressUpdateReducer,
  validateAddressReducer,
  addressDeleteReducer
} from 'reducers/address'

const othersReducer = reduceReducers(
  contactReducer,
  validateContactReducer,
  resetOthersErrorsReducer
)

const userReducer = reduceReducers(
  userSignUpReducer,
  userLoginReducer,
  validateUserNewReducer,
  userUpdateReducer,
  validateUserUpdateReducer,
  userPreferenceReducer,
  resetUserErrorsReducer,
  userLogoutReducer,
  addressNewReducer,
  addressUpdateReducer,
  validateAddressReducer,
  addressDeleteReducer
)

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
  hideCartReducer,
  changeQuantityReducer,
  removeDetailReducer
)

const StateRecord = Immutable.Record({
  categories: undefined,
  cart: undefined,
  products: undefined,
  product: undefined,
  user: undefined,
  others: undefined
});

export default combineReducers({
  categories: categoriesReducer,
  cart: cartReducer,
  products: productsReducer,
  product: productReducer,
  user: userReducer,
  others: othersReducer
}, StateRecord)
