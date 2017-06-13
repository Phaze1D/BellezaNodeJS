import * as types from 'actions/types'
import axios from "axios"

export const getOrders = (page, user_id, token) => {
  return {
    type: types.GET_ORDERS,
    payload: axios.get(`/api/user/${user_id}/orders`, {
      params: { page: page },
      headers: {'Authorization': `Bearer ${token}`}
    })
  }
}

export const getAllOrders = (page, status, token) => {
  return {
    type: types.GET_ORDERS,
    payload: axios.get(`/api/orders`, {
      params: {
        page: page,
        status: status
      },
      headers: {'Authorization': `Bearer ${token}`}
    })
  }
}

export const resetOrders = () => {
  return {
    type: types.RESET_ORDERS
  }
}


export const getOrder = (id, user_id, token) => {
  return {
    type: types.GET_ORDER,
    payload: axios.get(`/api/user/${user_id}/order/${id}`, {
      headers: {'Authorization': `Bearer ${token}`}
    })
  }
}

export const resetOrder = () => {
  return {
    type: types.RESET_ORDER
  }
}
