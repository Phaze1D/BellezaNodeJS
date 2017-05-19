import * as types from 'actions/types'
import { fromJS } from 'immutable'

export const INITIAL_USER = fromJS({
  telephones: [],
  addresses: [],
  preferences: true,
})

export const userSignUpReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case `${types.USER_SIGN_UP}_LOADING`:

    case `${types.USER_SIGN_UP}_SUCCESS`:

    case `${types.USER_SIGN_UP}_ERROR`:

    default: return state
  }
  return state
}

export const userLoginReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case `${types.USER_LOGIN}_LOADING`:

    case `${types.USER_LOGIN}_SUCCESS`:

    case `${types.USER_LOGIN}_ERROR`:

    default: return state
  }
  return state
}

export const validateUserNewReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case `${types.USER_VALIDATE_NEW}_LOADING`:

    case `${types.USER_VALIDATE_NEW}_SUCCESS`:

    case `${types.USER_VALIDATE_NEW}_ERROR`:

    default: return state
  }
  return state
}

export const userUpdateReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case `${types.USER_UPDATE}_LOADING`:

    case `${types.USER_UPDATE}_SUCCESS`:

    case `${types.USER_UPDATE}_ERROR`:

    default: return state
  }
}

export const userPreferenceReducer = (state = INITIAL_USER, action) => {
  if(action.type === `${types.ADD_MAILER}_SUCCESS` && action.meta.isUser){

  }
  return state
}

export const validateUserUpdateReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case `${types.USER_VALIDATE_UPDATE}_LOADING`:

    case `${types.USER_VALIDATE_UPDATE}_SUCCESS`:

    case `${types.USER_VALIDATE_UPDATE}_ERROR`:

    default: return state
  }
  return state
}

export const userLogoutReducer = (state = INITIAL_USER, action) => {
  if(action.type === types.USER_LOGOUT){

  }
  return state
}
