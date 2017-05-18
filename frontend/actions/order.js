import * as types from 'actions/types'
import axios from "axios"

export const getOrders = (page, userID, status) => {
  return {
    type: types.GET_ORDERS,
    payload: axios.get('/orders', {
      params: {
        page: page,
        userID: userID,
        status: status
      }
    })
  }
}

export const resetOrders = () => {
  return {
    type: types.RESET_ORDERS
  }
}


export const getOrder = (id) => {
  return {
    type: types.GET_ORDER,
    payload: axios.get(`/order/${id}`)
  }
}

export const resetOrder = () => {
  return {
    type: types.RESET_ORDER
  }
}
