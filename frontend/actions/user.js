import * as types from 'actions/types'
import axios from "axios"


export const userSignUp = (formData) => {
  return {
    type: types.USER_SIGN_UP,
    payload: axios.post('/user', formData)
  }
}

export const userLogin = (formData) => {
  return {
    type: types.USER_LOGIN,
    payload: axios.post('/login', formData)
  }
}

export const validateUserNew = (fieldData) => {
  return {
    type: types.USER_VALIDATE_NEW,
    payload: axios.get('/validate-user', fieldData)
  }
}

export const userUpdate = (formData, id) => {
  return {
    type: types.USER_UPDATE,
    payload: axios.put(`/user/${id}`, formData)
  }
}

export const userLogout = () => {
  return {
    type: types.USER_LOGOUT
  }
}
