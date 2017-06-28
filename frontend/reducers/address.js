import * as types from 'actions/types'
import { fromJS } from 'immutable'
import { INITIAL_USER } from 'reducers/user'


export const addressNewReducer = (state = INITIAL_USER, action) => {
	switch (action.type) {
	case `${types.ADDRESS_NEW}_SUCCESS`: {
		let addresses = state.get('addresses').push(fromJS(action.payload.data))
		return state.set('addresses', addresses)
	}

	default: return state
	}
}

export const addressUpdateReducer = (state = INITIAL_USER, action) => {
	switch (action.type) {
	case `${types.ADDRESS_UPDATE}_SUCCESS`: {
		let addresses = state.get('addresses').set(action.meta.index, fromJS(action.payload.data))
		return state.set('addresses', addresses)
	}

	default: return state
	}
}

export const addressDeleteReducer = (state = INITIAL_USER, action) => {
	switch (action.type) {
	case `${types.ADDRESS_DELETE}_SUCCESS`: {
		let addresses = state.get('addresses').delete(action.meta.index)
		return state.set('addresses', addresses)
	}

	default: return state
	}
}
