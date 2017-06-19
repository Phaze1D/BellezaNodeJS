import * as types from "actions/types"
import { List, fromJS } from "immutable"

const INITIAL_CATEGORIES = List()

export const getCategoriesReducer = (state = INITIAL_CATEGORIES, action) => {
	switch (action.type) {
		
	case `${types.GET_CATEGORIES}_SUCCESS`:
		return fromJS(action.payload.data)

	default: return state
	}
}
