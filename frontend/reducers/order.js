import * as types from 'actions/types'
import { fromJS } from 'immutable'

const INITIAL_ORDERS = fromJS({
  rows: [],
  count: 0
})

const INITIAL_ORDER = fromJS({
  details: [],
  status: '',
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
  date: new Date()
})

export const getOrdersReducer = (state = INITIAL_ORDERS, action) => {
  switch (action.type) {
    case `${types.GET_ORDERS}_LOADING`:
      return state

    case `${types.GET_ORDERS}_SUCCESS`:

      return fromJS(action.payload.data)

    case `${types.GET_ORDERS}_ERROR`:

    default: return state
  }
}


export const resetOrdersReducer = (state = INITIAL_ORDERS, action) => {
  if(action.type === types.RESET_ORDERS){
    return INITIAL_ORDERS
  }
  return state
}


export const getOrderReducer = (state = INITIAL_ORDER, action) => {
  switch (action.type) {
    case `${types.GET_ORDER}_LOADING`:
      return state

    case `${types.GET_ORDER}_SUCCESS`:
      return fromJS(action.payload.data)


    case `${types.GET_ORDER}_ERROR`:

    default: return state
  }
}


export const resetOrderReducer = (state = INITIAL_ORDER, action) => {
  if(action.type === types.RESET_ORDER){
    return INITIAL_ORDER
  }
  return state
}
