import * as types from 'actions/types'
import { fromJS } from 'immutable'

const INITIAL_PRODUCTS = fromJS({
  rows: [],
  count: 0
})

const INITIAL_PRODUCT = fromJS({
  price: 0,
  discount: 0,
  related: [],
  categories: [],
})

export const getProductsReducer = (state = INITIAL_PRODUCTS, action) => {
  switch (action.type) {
    case `${types.GET_PRODUCTS}_LOADING`:
    return state

    case `${types.GET_PRODUCTS}_SUCCESS`:
    return fromJS(action.payload.data)

    case `${types.GET_PRODUCTS}_ERROR`:

    default: return state
  }
}

export const resetProductsReducer = (state = INITIAL_PRODUCTS, action) => {
  if(action.type === types.RESET_PRODUCTS){
    return INITIAL_PRODUCTS
  }
  return state
}


export const getProductReducer = ( state = INITIAL_PRODUCT, action) => {
  switch (action.type) {
    case `${types.GET_PRODUCT}_LOADING`:
      return state.set('loading', true)

    case `${types.GET_PRODUCT}_SUCCESS`:
      return fromJS(action.payload.data)

    case `${types.GET_PRODUCT}_ERROR`:

    default: return state
  }
}


export const resetProductReducer = (state = INITIAL_PRODUCT, action) => {
  if(action.type === types.RESET_PRODUCT){
    return INITIAL_PRODUCT
  }
  return state
}
