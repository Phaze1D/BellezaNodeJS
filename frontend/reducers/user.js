import * as types from 'actions/types'
import { fromJS, Map } from 'immutable'

export const INITIAL_USER = Map()

export const userSignUpReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case `${types.USER_SIGN_UP}_LOADING`:
      return state

    case `${types.USER_SIGN_UP}_SUCCESS`:
      let usr = action.payload.data
      return fromJS(usr)

    case `${types.USER_SIGN_UP}_ERROR`:

    default: return state
  }
  return state
}

export const userLoginReducer = (state = INITIAL_USER, action) => {
  switch (action.type) {
    case `${types.USER_LOGIN}_LOADING`:
      return state

    case `${types.USER_LOGIN}_SUCCESS`:
      let usr = action.payload.data
      return fromJS(usr)

    case `${types.USER_LOGIN}_ERROR`:

    default: return state
  }
  return state
}

export const validateUserReducer = (state = INITIAL_USER, action) => {
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
      return state

    case `${types.USER_UPDATE}_SUCCESS`:
      let user = action.payload.data
      return state.withMutations(map => {
        map.set('first_name', user.first_name)
           .set('last_name', user.last_name)
           .set('telephone', user.telephone)
      })

    case `${types.USER_UPDATE}_ERROR`:

    default: return state
  }
}

export const userPreferenceReducer = (state = INITIAL_USER, action) => {
  if(action.type === `${types.ADD_MAILER}_SUCCESS` && action.meta.isUser){
    return state.set('preferences', action.payload.data.active)
  }
  return state
}

export const userLogoutReducer = (state = INITIAL_USER, action) => {
  if(action.type === types.USER_LOGOUT){

  }
  return state
}
