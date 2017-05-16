import * as types from 'actions/types'

const INITIAL_PRODUCTS = {
  results: [],
  total: 0
}

export const getProductsReducer = (state = INITIAL_PRODUCTS, action) => {
  switch (action.type) {
    case `${types.GET_PRODUCTS}_LOADING`:
      return {
        ...state,
      }

    case `${types.GET_PRODUCTS}_SUCCESS`:
      return {
        ...state,
      }

    case `${types.GET_PRODUCTS}_ERROR`:
      return {
        ...state,
      }
    default: return state
  }
}

export const resetProductsReducer = (state = INITIAL_PRODUCTS, action) => {
  if(action.type === types.RESET_PRODUCTS){
    return {
      ...state,
      results: [],
      total: 0
    }
  }
  return state
}

const INITIAL_PRODUCT = {
  related: [],
}

export const getProductReducer = ( state = INITIAL_PRODUCT, action) => {
  switch (action.type) {
    case `${types.GET_PRODUCT}_LOADING`:
      return {
        ...state,
      }

    case `${types.GET_PRODUCT}_SUCCESS`:
      return {
        ...state,
      }

    case `${types.GET_PRODUCT}_ERROR`:
      return {
        ...state,
      }
    default: return state
  }
}

export const resetProductReducer = (state = INITIAL_PRODUCT, action) => {
  if(action.type === types.RESET_PRODUCT){
    return {
      related: [],
    }
  }
  return state
}
