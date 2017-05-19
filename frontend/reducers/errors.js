import * as types from 'actions/types'
import { fromJS, Map } from 'immutable'

const INITIAL_ERRORS = Map()


export const errorsReducer = (state = INITIAL_ERRORS, action) => {

  if(action.type.includes('ERROR')){

  }

  if(action.type === types.RESET_ERRORS){
    
  }

  return state
}
