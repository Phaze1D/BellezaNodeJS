import * as types from 'actions/types'
import { fromJS } from 'immutable'

const INITIAL_OTHERS = fromJS({
  errors: {}
})

export const contactReducer = (state = INITIAL_OTHERS, action) => {
  switch (action.type) {
    case `${types.CONTACT}_LOADING`:

    case `${types.CONTACT}_SUCCESS`:

    case `${types.CONTACT}_ERROR`:

    default: return state
  }
  return state
}

export const validateContactReducer = (state = INITIAL_OTHERS, action) => {
  switch (action.type) {
    case `${types.CONTACT_VALIDATE}_LOADING`:

    case `${types.CONTACT_VALIDATE}_SUCCESS`:

    case `${types.CONTACT_VALIDATE}_ERROR`:

    default: return state
  }
  return state
}

export const passwordResetReducer = (state = INITIAL_OTHERS, action) => {
  switch (action.type) {
    case `${types.PASSWORD_RESET}_LOADING`:

    case `${types.PASSWORD_RESET}_SUCCESS`:

    case `${types.PASSWORD_RESET}_ERROR`:

    default: return state
  }
  return state
}

export const resetOthersErrorsReducer = (state = INITIAL_OTHERS, action) => {
  if(action.type === types.OTHERS_RESET_ERRORS){

  }
  return state
}
