import * as types from 'actions/types'
import axios from "axios"

export const getUserCodes = (user_id, token) => {
  return {
    type: types.GET_USER_CODES,
    payload: axios.get(`api/user/${user_id}/codes`, {
      headers: {'Authorization': `Bearer ${token}`}
    })
  }
}

export const resetCodes = () => {
  return {
    type: types.RESET_CODES
  }
}

export const checkUserCode = (formData, user_id, token) => {
  return {
    type: types.CHECK_USER_CODE,
    payload: axios.get(`api/user/${user_id}/check-code`, {
      params: formData,
      headers: {'Authorization': `Bearer ${token}`}
    })
  }
}

export const codeNew = (formData, user_id, token) => {
  return {
    type: types.CODE_NEW,
    payload: axios.post(`api/user/${user_id}/code`, formData, {
      headers: {'Authorization': `Bearer ${token}`}
    })
  }
}
