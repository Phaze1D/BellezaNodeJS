import * as types from 'actions/types'


export const fetchingReducer = (state = false, action) => {

  if(action.type.includes('LOADING')){
    return true
  }

  if(action.type.includes('SUCCESS') || action.type.includes('ERROR') ){
    return false
  }

  return state
}
