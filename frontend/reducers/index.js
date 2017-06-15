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
  resetCartReducer,
  checkUserCodeReducer
} from 'reducers/cart'

import {
  userSignUpReducer,
  userLoginReducer,
  userUpdateReducer,
  userPreferenceReducer,
  userLogoutReducer,
  passwordResetReducer
} from 'reducers/user'

import {
  getBannersReducer,
  resetBannersReducer,
  getBannerReducer,
  getMailingReducer,
  resetMailingReducer
} from 'reducers/others'

import {
  addressNewReducer,
  addressUpdateReducer,
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
  resetCodesReducer
} from 'reducers/discountcode'

import {
  cashPaymentReducer,
  cardPaymentReducer
} from 'reducers/payment'

import {
  errorsResponseReducer,
  resetErrorsReducer,
  setErrorReducer
} from 'reducers/errors'

import {
  getClientsReducer,
  resetClientsReducer,
  getClientReducer,
  resetClientReducer
} from 'reducers/clients'

import { fetchingReducer } from 'reducers/fetching'

const errorsReducer = reduceReducers(
  errorsResponseReducer,
  resetErrorsReducer,
  setErrorReducer
)

const clientReducers = reduceReducers(
    getClientReducer,
    resetClientReducer
)

const clientsReducers = reduceReducers(
  getClientsReducer,
  resetClientsReducer,
)

const codesReducers = reduceReducers(
  getUserCodesReducer,
  resetCodesReducer
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
  getBannersReducer,
  resetBannersReducer,
  getBannerReducer,
  getMailingReducer,
  resetMailingReducer
)

const userReducer = reduceReducers(
  userSignUpReducer,
  userLoginReducer,
  userUpdateReducer,
  userPreferenceReducer,
  userLogoutReducer,
  addressNewReducer,
  addressUpdateReducer,
  addressDeleteReducer,
  passwordResetReducer
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
  resetCartReducer,
  checkUserCodeReducer,
  cashPaymentReducer,
  cardPaymentReducer
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
  order: undefined,
  clients: undefined,
  client: undefined,
  errors: undefined,
  fetching: undefined
});

export const getReducers = (preloadState=StateRecord) => {
  return combineReducers({
    categories: categoriesReducer,
    cart: cartReducer,
    products: productsReducer,
    product: productReducer,
    user: userReducer,
    others: othersReducer,
    orders: ordersReducer,
    codes: codesReducers,
    order: orderReducer,
    clients: clientsReducers,
    client: clientReducers,
    errors: errorsReducer,
    fetching: fetchingReducer
  }, preloadState)
}
