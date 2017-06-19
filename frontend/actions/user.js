import * as types from "actions/types"
import axios from "axios"


export const userSignUp = (formData) => {
	return {
		type: types.USER_SIGN_UP,
		payload: axios.post("/api/user", formData)
	}
}

export const userLogin = (formData) => {
	return {
		type: types.USER_LOGIN,
		payload: axios.post("/api/login", formData)
	}
}

export const validateUser = (fieldData) => {
	return {
		type: types.USER_VALIDATE_NEW,
		payload: axios.get("/api/validate-user", {
			params: fieldData
		})
	}
}

export const userUpdate = (formData, id, token) => {
	return {
		type: types.USER_UPDATE,
		payload: axios.put(`/api/user/${id}`, formData, {
			headers: {"Authorization": `Bearer ${token}`}
		})
	}
}

export const userLogout = () => {
	return {
		type: types.USER_LOGOUT
	}
}
