import * as types from 'actions/types'
import { fromJS, Map } from 'immutable'
import { INITIAL_CART } from './cart'

export const cashPaymentReducer = (state = INITIAL_CART, action) => {
  switch (action.type) {
    case `${types.CASH_PAYMENT}_LOADING`:
      return state

    case `${types.CASH_PAYMENT}_SUCCESS`:
      return state.set('charges', fromJS(action.payload.data.charges))

    case `${types.CASH_PAYMENT}_ERROR`:

    default: return state
  }
}

export const cardPaymentReducer = (state = INITIAL_CART, action) => {
  switch (action.type) {
    case `${types.CARD_PAYMENT}_LOADING`:
      return state

    case `${types.CARD_PAYMENT}_SUCCESS`:
      return state.set('charges', fromJS(action.payload.data.charges))

    case `${types.CARD_PAYMENT}_ERROR`:

    default: return state
  }
}
