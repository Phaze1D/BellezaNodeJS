import * as types from 'actions/types'
import axios from "axios"


export const resetErrors = (key) => {
  return {
    type: types.RESET_ERRS,
    payload: {key: key}
  }
}

export const setError = (key, value) => {
  return {
    type: types.SET_ERR,
    payload: {key: key, value: value}
  }
}
