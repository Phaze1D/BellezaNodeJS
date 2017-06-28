import * as types from 'actions/types'
import axios from 'axios'

export const contact = (formData) => {
	return {
		type: types.CONTACT,
		payload: axios.post('/api/contact', formData)
	}
}

export const validateContact = (fieldData) => {
	return {
		type: types.CONTACT_VALIDATE,
		payload: axios.get('/api/validate-contact', fieldData)
	}
}

export const passwordForgot = (formData) => {
	return {
		type: types.PASSWORD_FORGOT,
		payload: axios.post('/api/forgot', formData)
	}
}

export const passwordReset = (formData, token) => {
	return {
		type: types.PASSWORD_RESET,
		payload: axios.post(`/api/reset/${token}`, formData)
	}
}

export const addMailer = (formData, isUser=false) => {
	return {
		type: types.ADD_MAILER,
		payload: axios.post('/api/addmailer', formData),
		meta: {isUser: isUser}
	}
}

export const getBanners = (page, token) => {
	return {
		type: types.GET_BANNERS,
		payload: axios.get('/api/banners', {
			params: {
				page: page
			},
			headers: {'Authorization': `Bearer ${token}`}
		})
	}
}

export const getCarousel = () => {
	return {
		type: types.GET_BANNERS,
		payload: axios.get('/api/carousel', {
			params: {
				page: 0
			},
		})
	}
}

export const resetBanners = () => {
	return {
		type: types.RESET_BANNERS
	}
}


export const getBanner = (id, token) => {
	return {
		type: types.GET_BANNER,
		payload: axios.get(`/api/banner/${id}`, {
			headers: {'Authorization': `Bearer ${token}`}
		})
	}
}

export const resetBanner = () => {
	return {
		type: types.RESET_BANNER
	}
}


export const newBanner = (formData, token) => {
	return {
		type: types.NEW_BANNER,
		payload: axios.post('/api/banner', formData, {
			headers: {'Authorization': `Bearer ${token}`}
		})
	}
}

export const editBanner = (formData, id, token) => {
	return {
		type: types.EDIT_BANNER,
		payload: axios.put(`/api/banner/${id}`, formData, {
			headers: {'Authorization': `Bearer ${token}`}
		})
	}
}

export const deleteBanner = (id, token) => {
	return {
		type: types.DELETE_BANNER,
		payload: axios.delete(`/api/banner/${id}`, {
			headers: {'Authorization': `Bearer ${token}`}
		})
	}
}

export const getMailing = (page, token) => {
	return {
		type: types.GET_MAILING,
		payload: axios.get('/api/mailing', {
			params: {page: page},
			headers: {'Authorization': `Bearer ${token}`}
		})
	}
}

export const resetMailing = () => {
	return {
		type: types.RESET_MAILING
	}
}
