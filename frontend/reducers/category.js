import * as types from 'actions/types'
import { List } from 'immutable'

const INITIAL_CATEGORIES = List()

export const getCategoriesReducer = (state = INITIAL_CATEGORIES, action) => {
  switch (action.type) {
    case `${types.GET_CATEGORIES}_LOADING`:

    case `${types.GET_CATEGORIES}_SUCCESS`:

    case `${types.GET_CATEGORIES}_ERROR`:

    default: return state
  }
}
