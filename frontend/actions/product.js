import * as types from 'actions/types'
import axios from "axios"


export const getProducts = (search, category, page, sort=0) => {
  return {
    type: types.GET_PRODUCTS,
    payload: axios.get('/api/products', {
      params: {
        search: search,
        category: category,
        page: page,
        sort: sort
      }
    })
  }
}

export const getFavs = () => {
  return {
    type: types.GET_PRODUCTS,
    payload: axios.get('/api/favProducts')
  }
}

export const getBackofficeProducts = (search, page, sort=0, token) => {
  return {
    type: types.GET_PRODUCTS,
    payload: axios.get('/api/backoffice/products', {
      params: {
        search: search,
        page: page,
        sort: sort
      },
      headers: {'Authorization': `Bearer ${token}`}
    })
  }
}

export const resetProducts = () => {
  return {
    type: types.RESET_PRODUCTS,
  }
}

export const getProduct = (id) => {
  return {
    type: types.GET_PRODUCT,
    payload: axios.get(`/api/product/${id}`)
  }
}

export const resetProduct = () => {
  return {
    type: types.RESET_PRODUCT,
  }
}

export const newProduct = (formData, token) => {
  return {
    type: types.NEW_PRODUCT,
    payload: axios.post('/api/product', formData, {
      headers: {'Authorization': `Bearer ${token}`}
    })
  }
}

export const editProduct = (formData, id, token) => {
  return {
    type: types.EDIT_PRODUCT,
    payload: axios.put(`/api/product/${id}`, formData, {
      headers: {'Authorization': `Bearer ${token}`}
    })
  }
}
