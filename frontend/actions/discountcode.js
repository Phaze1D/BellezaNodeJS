import * as types from 'actions/types'
import axios from "axios"

export const getUserCodes = (userID) => {
  return {
    type: types.GET_USER_CODES,
    payload: axios.get('/codes', {
      params: {
        userID: userID
      }
    })
  }
}

export const resetCodes = () => {
  return {
    type: types.RESET_CODES
  }
}

export const checkUserCode = (formData) => {
  return {
    type: types.CHECK_USER_CODE,
    payload: axios.post('/check-code', formData)
  }
}
