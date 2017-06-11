import * as types from 'actions/types'
import { fromJS, Map } from 'immutable'

const INITIAL_ERRORS = fromJS({
  global: {
    status: "",
    message: ""
  }
})


export const errorsResponseReducer = (state = INITIAL_ERRORS, action) => {
  if(action.type.includes('ERROR')){
    switch (action.payload.response.status) {
      case 422:
        let res = action.payload.response.data
        return state.withMutations(map => {
          res.forEach(error => map.set(error.path, error.message))
        })

      default:
        return state.setIn(['global', 'status'], action.payload.response.status)
                    .setIn(['global', 'message'], action.payload.response.statusText)
    }
  }

  return state
}


export const resetErrorsReducer = (state = INITIAL_ERRORS, action) => {
  if(action.type === types.RESET_ERRS){
    if(action.payload.key){
      return state.delete(action.payload.key)
    }else{
      return INITIAL_ERRORS
    }
  }
  return state
}

export const setErrorReducer = (state = INITIAL_ERRORS, action) => {
  if(action.type === types.SET_ERR){
    return state.set(action.payload.key, action.payload.value)
  }
  return state
}
