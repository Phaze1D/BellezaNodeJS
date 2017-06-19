import * as types from "actions/types"
import axios from "axios"

export const addressNew = (formData, user_id, token) => {
	return {
		type: types.ADDRESS_NEW,
		payload: axios.post(`/api/user/${user_id}/address`, formData, {
			headers: {"Authorization": `Bearer ${token}`}
		})
	}
}

export const addressUpdate = (index, formData, id, user_id, token) => {
	return {
		type: types.ADDRESS_UPDATE,
		payload: axios.put(`/api/user/${user_id}/address/${id}`, formData, {
			headers: {"Authorization": `Bearer ${token}`}
		}),
		meta: {index: index}
	}
}

export const validateAddress = (fieldData, token) => {
	return {
		type: types.ADDRESS_VALIDATE,
		payload: axios.get("/api/validate-address", {
			params: fieldData,
			headers: {"Authorization": `Bearer ${token}`}
		})
	}
}

export const addressDelete = (index, id, user_id, token) => {
	return {
		type: types.ADDRESS_DELETE,
		payload: axios.delete(`/api/user/${user_id}/address/${id}`, {
			headers: {"Authorization": `Bearer ${token}`}
		}),
		meta: {index: index}
	}
}
