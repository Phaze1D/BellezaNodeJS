import * as types from "actions/types"
import { fromJS } from "immutable"

const INITIAL_CODES = fromJS({
	active: [],
	deactive: [],
})


export const getUserCodesReducer = (state = INITIAL_CODES, action) => {
	switch (action.type) {
	case `${types.GET_USER_CODES}_SUCCESS`: {
		let active = []
		let deactive = []

		action.payload.data.forEach(code => {
			let ed = new Date(code.expires_date)
			if(ed < Date.now()){
				deactive.push(code)
			}else{
				active.push(code)
			}
		})
		return fromJS({
			active: active,
			deactive: deactive,
		})
	}

	default: return state
	}
}

export const resetCodesReducer = (state = INITIAL_CODES, action) => {
	if(action.type === types.RESET_CODES){
		return INITIAL_CODES
	}
	return state
}
