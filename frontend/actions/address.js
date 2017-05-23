import * as types from 'actions/types'
import axios from "axios"

export const addressNew = (formData) => {
  return {
    type: types.ADDRESS_NEW,
    payload: axios.post('/address', formData)
  }
}

export const addressUpdate = (formData, id) => {
  return {
    type: types.ADDRESS_UPDATE,
    payload: axios.put(`/address/${id}`, formData)
  }
}

export const validateAddress = (fieldData) => {
  return {
    type: types.ADDRESS_VALIDATE,
    payload: axios.get('/validate-address', {
      params: fieldData
    })
  }
}

export const addressDelete = (id) => {
  return {
    type: types.ADDRESS_DELETE,
    payload: axios.delete(`/address/${id}`)
  }
}
