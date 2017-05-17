import * as types from 'actions/types'
import { fromJS } from 'immutable'

const INITIAL_PRODUCTS = fromJS({
  results: [],
  total: 0
})

const INITIAL_PRODUCT = fromJS({
  related: [],
})

export const getProductsReducer = (state = INITIAL_PRODUCTS, action) => {
  switch (action.type) {
    case `${types.GET_PRODUCTS}_LOADING`:

    case `${types.GET_PRODUCTS}_SUCCESS`:

    case `${types.GET_PRODUCTS}_ERROR`:

    default: return state
  }
}

export const resetProductsReducer = (state = INITIAL_PRODUCTS, action) => {
  if(action.type === types.RESET_PRODUCTS){
    return fromJS({
      results: [],
      total: 0
    })
  }
  return state
}


export const getProductReducer = ( state = INITIAL_PRODUCT, action) => {
  switch (action.type) {
    case `${types.GET_PRODUCT}_LOADING`:

    case `${types.GET_PRODUCT}_SUCCESS`:

    case `${types.GET_PRODUCT}_ERROR`:

    default: return state
  }
}

export const resetProductReducer = (state = INITIAL_PRODUCT, action) => {
  if(action.type === types.RESET_PRODUCT){
    return fromJS({
      related: [],
    })
  }
  return state
}
