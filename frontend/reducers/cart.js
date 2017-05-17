import * as types from 'actions/types'
import { fromJS } from 'immutable'


const INITIAL_CART = fromJS({
  details: [],
  subTotal: 0,
  ivaTotal: 0,
  discountTotal: 0,
  shippingTotal: 0,
  total: 0,
  shippingAddress: {},
  invoiceAddress: {},
  error: null,
  show: false,
})

export const addDetailReducer = ( state = INITIAL_CART, action) => {
  if(action.type === types.CART_ADD_DETAIL){

  }
  return state
}

export const changeQuantityReducer = (state = INITIAL_CART, action) => {
  if(action.type === types.CART_CHANGE_QUANTITY){

  }
  return state
}

export const removeDetailReducer = (state = INITIAL_CART, action) => {
  if(action.type === types.CART_REMOVE_DETAIL){

  }
  return state
}


export const hideCartReducer = (state = INITIAL_CART, action) => {
  if(action.type === types.HIDE_CART){

  }
  return state
}
