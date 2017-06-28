import * as types from 'actions/types'
import { fromJS } from 'immutable'
import { INITIAL_CART } from './cart'

export const cashPaymentReducer = (state = INITIAL_CART, action) => {
	switch (action.type) {
	case `${types.CASH_PAYMENT}_SUCCESS`:
		return state.set('charges', fromJS(action.payload.data.charges))

	default: return state
	}
}

export const cardPaymentReducer = (state = INITIAL_CART, action) => {
	switch (action.type) {
	case `${types.CARD_PAYMENT}_SUCCESS`:
		return state.set('charges', fromJS(action.payload.data.charges))

	default: return state
	}
}
