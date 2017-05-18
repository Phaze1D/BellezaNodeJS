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
  removeDetailReducer,
  addCartAddressReducer,
  addCartExtraReducer,
  resetCartReducer
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
  resetOthersErrorsReducer,
} from 'reducers/others'

import {
  addressNewReducer,
  addressUpdateReducer,
  validateAddressReducer,
  addressDeleteReducer
} from 'reducers/address'

import {
  getOrdersReducer,
  resetOrdersReducer,
  getOrderReducer,
  resetOrderReducer
} from 'reducers/order'

import {
  getUserCodesReducer,
  resetCodesReducer,
  checkUserCodeReducer
} from 'reducers/discountcode'

import {
  cashPaymentReducer,
  cardPaymentReducer
} from 'reducers/payment'

const paymentReducers = reduceReducers(
  cashPaymentReducer,
  cardPaymentReducer
)

const codesReducers = reduceReducers(
  getUserCodesReducer,
  resetCodesReducer,
  checkUserCodeReducer
)

const ordersReducer = reduceReducers(
  getOrdersReducer,
  resetOrdersReducer
)

const orderReducer = reduceReducers(
  getOrderReducer,
  resetOrderReducer
)

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
  removeDetailReducer,
  addCartAddressReducer,
  addCartExtraReducer,
  resetCartReducer
)

const StateRecord = Immutable.Record({
  categories: undefined,
  cart: undefined,
  products: undefined,
  product: undefined,
  user: undefined,
  others: undefined,
  orders: undefined,
  codes: undefined,
  payment: undefined,
  order: undefined
});

export default combineReducers({
  categories: categoriesReducer,
  cart: cartReducer,
  products: productsReducer,
  product: productReducer,
  user: userReducer,
  others: othersReducer,
  orders: ordersReducer,
  codes: codesReducers,
  payment: paymentReducers,
  order: orderReducer
}, StateRecord)
