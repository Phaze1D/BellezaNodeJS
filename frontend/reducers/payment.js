import * as types from 'actions/types'
import { fromJS, Map } from 'immutable'

const INITIAL_PAYMENT = Map()

export const cashPaymentReducer = (state = INITIAL_PAYMENT, action) => {
  switch (action.type) {
    case `${types.CASH_PAYMENT}_LOADING`:
      return state

    case `${types.CASH_PAYMENT}_SUCCESS`:
      console.log(action.payload.data);
      return state

    case `${types.CASH_PAYMENT}_ERROR`:

    default: return state
  }
}

export const cardPaymentReducer = (state = INITIAL_PAYMENT, action) => {
  switch (action.type) {
    case `${types.CARD_PAYMENT}_LOADING`:
      return state

    case `${types.CARD_PAYMENT}_SUCCESS`:
      console.log(action.payload.data);
      return state;

    case `${types.CARD_PAYMENT}_ERROR`:

    default: return state
  }
}
