import * as types from 'actions/types'
import { fromJS } from 'immutable'
import { INITIAL_USER } from 'reducers/user'


export const addressNewReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case `${types.ADDRESS_NEW}_LOADING`:

    case `${types.ADDRESS_NEW}_SUCCESS`:

    case `${types.ADDRESS_NEW}_ERROR`:

    default: return state
  }
  return state
}

export const addressUpdateReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case `${types.ADDRESS_UPDATE}_LOADING`:

    case `${types.ADDRESS_UPDATE}_SUCCESS`:

    case `${types.ADDRESS_UPDATE}_ERROR`:

    default: return state
  }
  return state
}

export const validateAddressReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case `${types.ADDRESS_VALIDATE}_LOADING`:

    case `${types.ADDRESS_VALIDATE}_SUCCESS`:

    case `${types.ADDRESS_VALIDATE}_ERROR`:

    default: return state
  }
  return state
}

export const addressDeleteReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case `${types.ADDRESS_DELETE}_LOADING`:

    case `${types.ADDRESS_DELETE}_SUCCESS`:

    case `${types.ADDRESS_DELETE}_ERROR`:

    default: return state
  }
  return state
}
