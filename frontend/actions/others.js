import * as types from 'actions/types'
import axios from "axios"

export const contact = (formData) => {
  return {
    type: types.CONTACT,
    payload: axios.post('/contact', formData)
  }
}

export const validateContact = (fieldData) => {
  return {
    type: types.CONTACT_VALIDATE,
    payload: axios.post('/validate-contact', fieldData)
  }
}

export const passwordReset = (formData) => {
  return {
    type: types.PASSWORD_RESET,
    payload: axios.post('/passwordreset', formData)
  }
}

export const addMailer = (formData, isUser=false) => {
  return {
    type: types.ADD_MAILER,
    payload: axios.post('/addmailer', formData),
    meta: {isUser: isUser}
  }
}

export const resetOthersErrors = (field) => {
  return {
    type: types.OTHERS_RESET_ERRORS,
    payload: {field: field}
  }
}
