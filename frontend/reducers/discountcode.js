import * as types from 'actions/types'
import { fromJS } from 'immutable'

const INITIAL_CODES = fromJS({
  active: [],
  deactive: [],
  discount: {},
})


export const getUserCodesReducer = (state = INITIAL_CODES, action) => {
  switch (action.type) {
    case `${types.GET_USER_CODES}_LOADING`:

    case `${types.GET_USER_CODES}_SUCCESS`:

    case `${types.GET_USER_CODES}_ERROR`:

    default: return state
  }
  return state
}

export const resetCodesReducer = (state = INITIAL_CODES, action) => {
  if(action.type === types.RESET_CODES){

  }
  return state
}

export const checkUserCodeReducer = (state = INITIAL_CODES, action) => {
  switch (action.type) {
    case `${types.CHECK_USER_CODE}_LOADING`:

    case `${types.CHECK_USER_CODE}_SUCCESS`:

    case `${types.CHECK_USER_CODE}_ERROR`:

    default: return state
  }
  return state
}

export const codeNewReducer = (state = INITIAL_CODES, action) => {
  switch (action.type) {
    case `${types.CODE_NEW}_LOADING`:

    case `${types.CODE_NEW}_SUCCESS`:

    case `${types.CODE_NEW}_ERROR`:

    default: return state
  }
  return state
}
