import * as types from 'actions/types'
import { fromJS, Map } from 'immutable'

const INITIAL_OTHERS = fromJS({
  banners: {
    rows: [],
    count: 0
  },
  mailing: {
    rows: [],
    count: 0
  },
  banner: {}
})

export const contactReducer = (state = INITIAL_OTHERS, action) => {
  switch (action.type) {
    case `${types.CONTACT}_LOADING`:

    case `${types.CONTACT}_SUCCESS`:

    case `${types.CONTACT}_ERROR`:

    default: return state
  }
}

export const validateContactReducer = (state = INITIAL_OTHERS, action) => {
  switch (action.type) {
    case `${types.CONTACT_VALIDATE}_LOADING`:

    case `${types.CONTACT_VALIDATE}_SUCCESS`:

    case `${types.CONTACT_VALIDATE}_ERROR`:

    default: return state
  }
}

export const passwordResetReducer = (state = INITIAL_OTHERS, action) => {
  switch (action.type) {
    case `${types.PASSWORD_RESET}_LOADING`:

    case `${types.PASSWORD_RESET}_SUCCESS`:

    case `${types.PASSWORD_RESET}_ERROR`:

    default: return state
  }
}


export const getBannersReducer = (state = INITIAL_OTHERS, action) => {
  switch (action.type) {
    case `${types.GET_BANNERS}_LOADING`:
      return state

    case `${types.GET_BANNERS}_SUCCESS`:
      return state.set('banners', fromJS(action.payload.data))

    case `${types.GET_BANNERS}_ERROR`:

    default: return state
  }
}

export const getBannerReducer = (state = INITIAL_OTHERS, action) => {
  switch (action.type) {
    case `${types.GET_BANNER}_LOADING`:
      return state.setIn(['banner','loading'], true)

    case `${types.GET_BANNER}_SUCCESS`:
      return state.set('banner', fromJS(action.payload.data))

    case `${types.GET_BANNER}_ERROR`:

    default: return state
  }
}

export const resetBannersReducer = (state = INITIAL_OTHERS, action) => {
  if(action.type === types.RESET_BANNERS){
    return INITIAL_OTHERS
  }
  return state
}


export const newBannerReducer = (state = INITIAL_OTHERS, action) => {
  switch (action.type) {
    case `${types.NEW_BANNER}_LOADING`:
      return state

    case `${types.NEW_BANNER}_SUCCESS`:

    case `${types.NEW_BANNER}_ERROR`:

    default: return state
  }
}

export const editBannerReducer = (state = INITIAL_OTHERS, action) => {
  switch (action.type) {
    case `${types.EDIT_BANNER}_LOADING`:
      return state

    case `${types.EDIT_BANNER}_SUCCESS`:

    case `${types.EDIT_BANNER}_ERROR`:

    default: return state
  }
}


export const getMailingReducer = (state = INITIAL_OTHERS, action) => {
  switch (action.type) {
    case `${types.GET_MAILING}_LOADING`:
      return state

    case `${types.GET_MAILING}_SUCCESS`:
      return state.set('mailing', fromJS(action.payload.data))

    case `${types.GET_MAILING}_ERROR`:

    default: return state
  }
}


export const resetMailingReducer = (state = INITIAL_OTHERS, action) => {
  if(action.type === types.RESET_MAILING){
    return INITIAL_OTHERS
  }
  return state
}
