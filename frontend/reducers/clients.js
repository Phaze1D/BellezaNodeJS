import * as types from 'actions/types'
import { fromJS, Map } from 'immutable'

const INITIAL_CLIENTS = fromJS({
  results: [],
  total: 0
})

const INITIAL_CLIENT = Map()

export const getClientsReducer = (state = INITIAL_CLIENTS, action) => {
  switch (action.type) {
    case `${types.GET_CLIENTS}_LOADING`:

    case `${types.GET_CLIENTS}_SUCCESS`:

    case `${types.GET_CLIENTS}_ERROR`:

    default: return state
  }
  return state
}

export const resetClientsReducer = (state = INITIAL_CLIENTS, action) => {
  if(action.type === types.RESET_CLIENTS){

  }
  return state
}

export const getClientReducer = (state = INITIAL_CLIENT, action) => {
  switch (action.type) {
    case `${types.GET_CLIENT}_LOADING`:

    case `${types.GET_CLIENT}_SUCCESS`:

    case `${types.GET_CLIENT}_ERROR`:

    default: return state
  }
  return state
}

export const resetClientReducer = (state = INITIAL_CLIENT, action) => {
  if(action.type === types.RESET_CLIENT){

  }
  return state
}
