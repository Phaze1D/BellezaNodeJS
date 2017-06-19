import * as types from "actions/types"
import axios from "axios"


export const getCategories = () => {
	return {
		type: types.GET_CATEGORIES,
		payload: axios.get("/api/categories")
	}
}
