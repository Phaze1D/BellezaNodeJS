import * as types from 'actions/types'
import { fromJS, Map } from 'immutable'

const INITIAL_CLIENTS = fromJS({
	rows: [],
	count: 0
})

const INITIAL_CLIENT = Map()

export const getClientsReducer = (state = INITIAL_CLIENTS, action) => {
	switch (action.type) {
	case `${types.GET_CLIENTS}_SUCCESS`:
		return fromJS(action.payload.data)

	default: return state
	}
}

export const resetClientsReducer = (state = INITIAL_CLIENTS, action) => {
	if(action.type === types.RESET_CLIENTS){
		return INITIAL_CLIENTS
	}
	return state
}

export const getClientReducer = (state = INITIAL_CLIENT, action) => {
	switch (action.type) {
	case `${types.GET_CLIENT}_SUCCESS`:
		return fromJS(action.payload.data)

	default: return state
	}
}

export const resetClientReducer = (state = INITIAL_CLIENT, action) => {
	if(action.type === types.RESET_CLIENT){
		return INITIAL_CLIENT
	}
	return state
}
