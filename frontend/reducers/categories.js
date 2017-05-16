import * as types from 'actions/types'

export const getCategoriesReducer = (state = [], action) => {
  switch (action.type) {

    case `${types.GET_CATEGORIES}_LOADING`:
      return state

    case `${types.GET_CATEGORIES}_SUCCESS`:
      return []

    /*
    Added Global error reducers
    case `${types.GET_CATEGORIES}_ERROR`:
      return {
        ...state,
      }
    */

    default: return state
  }
}
