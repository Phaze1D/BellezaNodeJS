import * as types from 'actions/types'
import axios from "axios"

export const getClients = (query, page, token) => {
  return {
    type: types.GET_CLIENTS,
    payload: axios.get('/clients', {
      params: {
        search: query,
        page: page
      },
      headers: {'Authorization': `Bearer ${token}`}
    })
  }
}

export const resetClients = () => {
  return {
    type: types.RESET_CLIENTS
  }
}


export const getClient = (id, token) => {
  return {
    type: types.GET_CLIENT,
    payload: axios.get(`/client/${id}`, {
      headers: {'Authorization': `Bearer ${token}`}
    })
  }
}


export const resetClient = () => {
  return {
    type: types.RESET_CLIENT
  }
}
