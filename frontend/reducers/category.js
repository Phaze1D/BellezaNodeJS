import * as types from 'actions/types'
import { List, fromJS } from 'immutable'

const INITIAL_CATEGORIES = List()

export const getCategoriesReducer = (state = INITIAL_CATEGORIES, action) => {
  switch (action.type) {
    case `${types.GET_CATEGORIES}_LOADING`:
      return state

    case `${types.GET_CATEGORIES}_SUCCESS`:
      let newState = []
      action.payload.data.parents.forEach( parent => {
        parent.subs = []
        action.payload.data.subs.forEach( sub => {
          if(sub.parent_id == parent.id){
            parent.subs.push(sub)
          }
        })
        newState.push(parent)
      })
      return fromJS(newState)

    case `${types.GET_CATEGORIES}_ERROR`:

    default: return state
  }
}
