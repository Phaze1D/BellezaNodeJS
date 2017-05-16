import * as types from 'actions/types'

const INITIAL_CART = {
  details: [],
  subTotal: 0,
  ivaTotal: 0,
  discountTotal: 0,
  shippingTotal: 0,
  total: 0,
  shippingAddress: {},
  invoiceAddress: {},
  error: null,
  show: false,
}

export const addDetailReducer = ( state = INITIAL_CART, action) => {
  if(action.type === types.CART_ADD_DETAIL){
    let newState = {
      ...state,
      discountTotal: 0,
      details: [].concat(state.details),
    }

    let newDetail = action.payload.detail
    let subTotal = 0
    let ivaTotal = 0
    let didFind = false

    newState.details.forEach( detail => {
      if(detail.id === newDetail.id) {
        didFind = true
        if(detail.quantity + newDetail.quantity <= newDetail.stock){
          detail.quantity += newDetail.quantity
          detail.subTotal = (detail.quantity * detail.price) * (detail.discount/100)
          newState.show = true
        }else{
          newState.error = `Cantidad Excedida`
        }
      }
      subTotal += detail.subTotal
      ivaTotal += (detail.subTotal) * (detail.iva/100)
    })

    if(!didFind){
      newState.details.push(newDetail)
      subTotal += newDetail.subTotal
      ivaTotal += (newDetail.subTotal) * (newDetail.iva/100)
      newState.show = true
    }

    newState.subTotal = subTotal
    newState.ivaTotal = ivaTotal
    newState.shippingTotal = newState.ivaTotal + newState.subTotal < 1000 ? 150 : 0
    newState.total = newState.ivaTotal + newState.subTotal + newState.shippingTotal

    return newState
  }
  return state
}


export const hideCartReducer = (state = INITIAL_CART, action) => {
  if(action.type === types.HIDE_CART){
    return {
      ...state,
      show: false
    }
  }

  return state
}
