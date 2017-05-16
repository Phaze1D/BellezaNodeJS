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
