import * as types from 'actions/types'
import axios from "axios"

export const getClients = (query, page) => {
  return {
    type: types.GET_CLIENTS,
    payload: axios.get('/clients', {
      params: {
        search: query,
        page: page
      }
    })
  }
}

export const resetClients = () => {
  return {
    type: types.RESET_CLIENTS
  }
}


export const getClient = (id) => {
  return {
    type: types.GET_CLIENT,
    payload: axios.get(`/client/${id}`)
  }
}


export const resetClient = () => {
  return {
    type: types.RESET_CLIENT
  }
}
