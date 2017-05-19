import * as types from 'actions/types'
import axios from "axios"


export const resetErrors = (key) => {
  return {
    type: types.RESET_ERRORS,
    payload: {key: key}
  }
}
