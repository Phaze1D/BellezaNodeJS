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
