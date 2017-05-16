import * as types from 'actions/types'


export const addDetail = (detail) => {
  return {
    type: types.CART_ADD_DETAIL,
    payload: {detail: detail}
  }
}

export const hideCart = () => {
  return {
    type: types.HIDE_CART
  }
}
