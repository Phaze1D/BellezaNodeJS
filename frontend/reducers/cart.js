import * as types from 'actions/types'
import { fromJS } from 'immutable'


const INITIAL_CART = fromJS({
  details: [],
  sub_total: 0,
  iva_total: 0,
  discount_total: 0,
  shipping_total: 0,
  total: 0,
  notes: '',
  shippingAddress: {},
  invoiceAddress: {},
  rfc: '',
  razon_social: '',
  code_used: '',
  show: false,
})

export const addDetailReducer = (state = INITIAL_CART, action) => {
  if(action.type === types.CART_ADD_DETAIL){
    let cart = state.toJS()
    let newDet = action.payload.detail
    let found = false
    cart.sub_total = 0
    cart.iva_total = 0
    cart.code_used = ''
    cart.discount_total = 0

    cart.details.forEach(detail => {
      if(detail.id === newDet.id){
        found = true
        if(detail.quantity + newDet.quantity <= detail.stock){
          detail.quantity += newDet.quantity
          detail.sub_total = detail.price * detail.quantity
          detail.sub_total -= detail.sub_total * (detail.discount/100)
        }
      }
      cart.sub_total += detail.sub_total
      cart.iva_total += detail.sub_total * (detail.iva/100)
    })

    if(!found){
      cart.details.push(newDet)
      cart.sub_total += newDet.sub_total
      cart.iva_total += newDet.sub_total * (newDet.iva/100)
    }

    cart.shipping_total = cart.sub_total < 1000 ? 150 : 0

    cart.total = cart.sub_total + cart.iva_total + cart.shipping_total
    cart.show = true

    return fromJS(cart)
  }
  return state
}

export const changeQuantityReducer = (state = INITIAL_CART, action) => {
  if(action.type === types.CART_CHANGE_QUANTITY){
    let quantity = action.payload.newQuantity
    if(quantity == 0 && state.get('details').size == 1){
      return INITIAL_CART
    }

    let oldDetail = state.getIn(['details', action.payload.index])
    let newDetail = oldDetail.withMutations(map => {
      let sub_total = map.get('price') * quantity
      sub_total -= sub_total * (map.get('discount')/100)
      map.set('quantity', quantity).set('sub_total', sub_total)
    })

    let difSub = newDetail.get('sub_total') - oldDetail.get('sub_total')
    let difIva = (newDetail.get('sub_total') * newDetail.get('iva')/100) - (oldDetail.get('sub_total') * oldDetail.get('iva')/100)

    return state.withMutations(map => {
      let sub_total = map.get('sub_total') + difSub
      let iva_total = map.get('iva_total') + difIva
      let shipping_total = sub_total < 1000 ? 150 : 0
      let total = sub_total + iva_total + shipping_total

      let f = quantity > 0 ? 'setIn' : 'deleteIn'
      map[f](['details', action.payload.index], newDetail)
         .set('sub_total', sub_total)
         .set('iva_total', iva_total)
         .set('shipping_total', shipping_total)
         .set('total', total)
         .set('discount_total', 0)
         .set('code_used', '')
    })

  }
  return state
}

export const removeDetailReducer = (state = INITIAL_CART, action) => {
  if(action.type === types.CART_REMOVE_DETAIL){
    let oldDetail = state.getIn(['details', action.payload.index])

    if(state.get('details').size == 1){
      return INITIAL_CART
    }
    return state.withMutations(map => {
      let sub_total = map.get('sub_total') - oldDetail.get('sub_total')
      let iva_total = map.get('iva_total') - (oldDetail.get('sub_total') * oldDetail.get('iva')/100)
      let shipping_total = sub_total < 1000 ? 150 : 0
      let total = sub_total + iva_total  + shipping_total

      map.deleteIn(['details', action.payload.index])
         .set('sub_total', sub_total)
         .set('iva_total', iva_total)
         .set('shipping_total', shipping_total)
         .set('total', total)
         .set('discount_total', 0)
         .set('code_used', '')
    })
  }
  return state
}


export const hideCartReducer = (state = INITIAL_CART, action) => {
  if(action.type === types.HIDE_CART){
    return state.set('show', false)
  }
  return state
}

export const addCartAddressReducer = (state = INITIAL_CART, action) => {
  if(action.type === types.CART_ADDRESS){
    return state.set(action.payload.type, fromJS(action.payload.address))
  }
  return state
}

export const addCartExtraReducer = (state = INITIAL_CART, action) => {
  if(action.type === types.CART_EXTRA){
    return state.withMutations(map => {
      map.set('notes', action.payload.notes)
         .set('rfc', action.payload.rfc)
    })
  }
  return state
}

export const checkUserCodeReducer = (state = INITIAL_CART, action) => {
  switch (action.type) {
    case `${types.CHECK_USER_CODE}_LOADING`:
      return state

    case `${types.CHECK_USER_CODE}_SUCCESS`:
      let code = action.payload.data
      return state.withMutations(map => {
        let total = map.get('total') - map.get('discount_total') // Subtracting because discount_total is negative value
        let discount_total = code.is_percentage ? (total * (code.discount/100)) : code.discount
        discount_total *= -1

        map.set('discount_total', discount_total)
           .set('total', total + discount_total) // Adding because discount_total is negative value
           .set('code_used', code.code)
      })

    case `${types.CHECK_USER_CODE}_ERROR`:

    default: return state
  }
}

export const resetCartReducer = (state = INITIAL_CART, action) => {
  if(action.type === types.RESET_CART){
    return INITIAL_CART
  }
  return state
}
