import * as types from 'actions/types'
import { fromJS, Map } from 'immutable'

const INITIAL_PAYMENT = Map()

export const cashPaymentReducer = (state = INITIAL_PAYMENT, action) => {
  switch (action.type) {
    case `${types.CASH_PAYMENT}_LOADING`:

    case `${types.CASH_PAYMENT}_SUCCESS`:

    case `${types.CASH_PAYMENT}_ERROR`:

    default: return state
  }
  return state
}

export const cardPaymentReducer = (state = INITIAL_PAYMENT, action) => {
  switch (action.type) {
    case `${types.CARD_PAYMENT}_LOADING`:

    case `${types.CARD_PAYMENT}_SUCCESS`:

    case `${types.CARD_PAYMENT}_ERROR`:

    default: return state
  }
  return state
}
