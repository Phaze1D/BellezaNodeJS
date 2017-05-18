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


export const addCartAddress = (address, type) => {
  return {
    type: type,
    payload: {
      address: address,
      type: type
    }
  }
}

export const addCartExtra = (extraData) => {
  return {
    type: types.CART_EXTRA,
    payload: extraData
  }
}

export const resetCart = () => {
  return {
    type: types.RESET_CART
  }
}
