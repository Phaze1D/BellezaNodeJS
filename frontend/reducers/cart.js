import * as types from 'actions/types'
import { fromJS } from 'immutable'


const INITIAL_CART = fromJS({
  details: [],
  sub_total: 0,
  iva_total: 0,
  discount_total: 0,
  shipping_total: 0,
  total: 0,
  notes: '',
  shippingAddress: {},
  invoiceAddress: {},
  rfc: '',
  razon_social: '',
  error: null,
  show: false,
})

export const addDetailReducer = (state = INITIAL_CART, action) => {
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

export const addCartAddressReducer = (state = INITIAL_CART, action) => {
  if(action.type === types.CART_SHIPPING_ADDRESS){

  }

  if(action.type === types.CART_INVOICE_ADDRESS){

  }
  return state
}

export const addCartExtraReducer = (state = INITIAL_CART, action) => {
  if(action.type === types.CART_EXTRA){

  }
  return state
}

export const resetCartReducer = (state = INITIAL_CART, action) => {
  if(action.type === types.RESET_CART){

  }
  return state
}
