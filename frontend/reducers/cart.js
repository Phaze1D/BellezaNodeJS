import * as types from 'actions/types'
import { fromJS } from 'immutable'


export const INITIAL_CART = fromJS({
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
	discount_code_id: null,
	show: false,
})

export const addDetailReducer = (state = INITIAL_CART, action) => {
	if(action.type === types.CART_ADD_DETAIL){

		let cart = state.toJS()
		let newDet = action.payload.detail
		let found = false
		cart.sub_total = 0
		cart.iva_total = 0
		cart.discount_code_id = null
		cart.discount_total = 0

		cart.details.forEach(detail => {
			let price = detail.price * (1 - detail.discount/100)
			let subTotal = Math.round(price/(1+detail.iva/100) * detail.quantity)
			let ivaTotal = Math.round(price*detail.quantity) - subTotal

			if(detail.product_id === newDet.product_id){
				found = true
				if(newDet.quantity <= detail.stock){
					price = newDet.price * (1 - newDet.discount/100)
					subTotal = Math.round(price/(1+newDet.iva/100) * newDet.quantity)
					ivaTotal = Math.round(price*newDet.quantity) - subTotal
					detail.quantity = newDet.quantity
					detail.sub_total = subTotal
				}
			}

			cart.sub_total += subTotal
			cart.iva_total += ivaTotal
		})

		if(!found){
			let price = newDet.price * (1 - newDet.discount/100)
			let subTotal =  Math.round(price/(1+newDet.iva/100) * newDet.quantity)
			let ivaTotal = Math.round(price*newDet.quantity) - subTotal
			newDet.sub_total = subTotal
			cart.details.push(newDet)
			cart.sub_total += subTotal
			cart.iva_total += ivaTotal
		}

		cart.shipping_total = cart.sub_total < 100000 ? 15000 : 0

		cart.total = cart.sub_total + cart.iva_total + cart.shipping_total
		cart.total = Math.round(cart.total)
		cart.sub_total = Math.round(cart.sub_total)
		cart.iva_total = Math.round(cart.iva_total)
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
		let oldP = oldDetail.get('price') * (1 - oldDetail.get('discount')/100)
		let oldSub = Math.round(oldP/(1+oldDetail.get('iva')/100) * oldDetail.get('quantity'))
		let newSub = Math.round(oldP/(1+oldDetail.get('iva')/100) * quantity)

		let newDetail = oldDetail.withMutations(map => {
			map.set('quantity', quantity).set('sub_total', newSub)
		})

		let difSub = newSub - oldSub
		let difIva = (Math.round(oldP * quantity) - newSub) - (Math.round(oldP * oldDetail.get('quantity')) - oldSub)

		return state.withMutations(map => {
			let sub_total = map.get('sub_total') + difSub
			let iva_total = map.get('iva_total') + difIva
			let shipping_total = sub_total < 100000 ? 15000 : 0
			let total = sub_total + iva_total + shipping_total

			let f = quantity > 0 ? 'setIn' : 'deleteIn'
			map[f](['details', action.payload.index], newDetail)
				.set('sub_total', Math.round(sub_total))
				.set('iva_total', Math.round(iva_total))
				.set('shipping_total', shipping_total)
				.set('total', Math.round(total))
				.set('discount_total', 0)
				.set('discount_code_id', null)
		})

	}
	return state
}

export const removeDetailReducer = (state = INITIAL_CART, action) => {
	if(action.type === types.CART_REMOVE_DETAIL){
		let oldDetail = state.getIn(['details', action.payload.index])
		let oldP = oldDetail.get('price') * (1 - oldDetail.get('discount')/100)
		let oldSub = Math.round(oldP/(1+oldDetail.get('iva')/100) * oldDetail.get('quantity'))

		if(state.get('details').size == 1){
			return INITIAL_CART
		}
		return state.withMutations(map => {
			let sub_total = map.get('sub_total') - oldSub
			let iva_total = map.get('iva_total') - (Math.round(oldP * oldDetail.get('quantity')) - oldSub)
			let shipping_total = sub_total < 100000 ? 15000 : 0
			let total = sub_total + iva_total  + shipping_total

			map.deleteIn(['details', action.payload.index])
				.set('sub_total', Math.round(sub_total))
				.set('iva_total', Math.round(iva_total))
				.set('shipping_total', shipping_total)
				.set('total', Math.round(total))
				.set('discount_total', 0)
				.set('discount_code_id', null)
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
				.set('razon_social', action.payload.razon_social)
		})
	}
	return state
}

export const checkUserCodeReducer = (state = INITIAL_CART, action) => {
	switch (action.type) {
	case `${types.CHECK_USER_CODE}_SUCCESS`: {
		let code = action.payload.data
		return state.withMutations(map => {

			let total = map.get('sub_total') + map.get('iva_total')
			let discount_total = 0

			discount_total = total * (code.discount/100)

			map.set('discount_total', Math.round(discount_total))
				.set('total', Math.round(total - discount_total + map.get('shipping_total')))
				.set('discount_code_id', code.id)
		})
	}

	default: return state
	}
}

export const resetCartReducer = (state = INITIAL_CART, action) => {
	if(action.type === types.RESET_CART){
		return INITIAL_CART
	}
	return state
}
