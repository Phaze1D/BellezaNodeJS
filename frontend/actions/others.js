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
    payload: axios.get('/validate-contact', fieldData)
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

export const getBanners = (page) => {
  return {
    type: types.GET_BANNERS,
    payload: axios.get('/banners', {
      params: {
        page: page
      }
    })
  }
}

export const resetBanners = () => {
  return {
    type: types.RESET_BANNERS
  }
}


export const getBanner = (id) => {
  return {
    type: types.GET_BANNER,
    payload: axios.get(`/banner/${id}`)
  }
}

export const resetBanner = () => {
  return {
    type: types.RESET_BANNER
  }
}


export const newBanner = (formData) => {
  return {
    type: types.NEW_BANNER,
    payload: axios.post('/banner', formData)
  }
}

export const editBanner = (formData, id) => {
  return {
    type: types.EDIT_BANNER,
    payload: axios.put(`/banner/${id}`, formData)
  }
}

export const getMailing = (page) => {
  return {
    type: types.GET_MAILING,
    payload: axios.get('/mailing', {
      params: {page: page}
    })
  }
}

export const resetMailing = () => {
  return {
    type: RESET_MAILING
  }
}
