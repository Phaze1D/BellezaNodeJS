import * as types from 'actions/types'
import axios from "axios"

export const cashPayment = (formData, token) => {
  return {
    type: types.CASH_PAYMENT,
    payload: axios.post('/payment/cash', formData, {
      headers: {'Authorization': `Bearer ${token}`}
    })
  }
}

export const cardPayment = (formData, token) => {
  return {
    type: types.CARD_PAYMENT,
    payload: axios.post('/payment/card', formData, {
      headers: {'Authorization': `Bearer ${token}`}
    })
  }
}
