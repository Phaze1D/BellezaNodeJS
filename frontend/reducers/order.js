import * as types from 'actions/types'
import { fromJS } from 'immutable'

const INITIAL_ORDERS = fromJS({
  results: [],
  total: 0
})

const INITIAL_ORDER = fromJS({
  details: [],
  subTotal: 0,
  ivaTotal: 0,
  discountTotal: 0,
  shippingTotal: 0,
  total: 0,
  shippingAddress: {},
  invoiceAddress: {},
  status: '',
  date: new Date()
})

export const getOrdersReducer = (state = INITIAL_ORDERS, action) => {
  switch (action.type) {
    case `${types.GET_ORDERS}_LOADING`:

    case `${types.GET_ORDERS}_SUCCESS`:

    case `${types.GET_ORDERS}_ERROR`:

    default: return state
  }
  return state
}


export const resetOrdersReducer = (state = INITIAL_ORDERS, action) => {
  if(action.type === types.RESET_ORDERS){

  }
  return state
}


export const getOrderReducer = (state = INITIAL_ORDER, action) => {
  switch (action.type) {
    case `${types.GET_ORDER}_LOADING`:

    case `${types.GET_ORDER}_SUCCESS`:

    case `${types.GET_ORDER}_ERROR`:

    default: return state
  }
  return state
}


export const resetOrderReducer = (state = INITIAL_ORDER, action) => {
  if(action.type === types.RESET_ORDER){

  }
  return state
}
