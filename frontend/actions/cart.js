import * as types from 'actions/types'


export const addDetail = (detail) => {
  return {
    type: types.CART_ADD_DETAIL,
    payload: {detail: detail}
  }
}

export const changeQuantity = (index, newQuantity) => {
  return {
    type: types.CART_CHANGE_QUANTITY,
    payload: {newQuantity: newQuantity, index: index}
  }
}

export const removeDetail = (index) => {
  return {
    type: types.CART_REMOVE_DETAIL,
    payload: {index: index}
  }
}

export const hideCart = () => {
  return {
    type: types.HIDE_CART
  }
}
