import assert from 'assert'
import {
	newDetail ,
	addDetailAction,
	changeQuantity,
	removeDetail,
	checkUserCode,
	conektaTotal,
	priceTotal
} from './fake.js'

import {
	addDetailReducer,
	changeQuantityReducer,
	removeDetailReducer,
	checkUserCodeReducer,
	INITIAL_CART
} from 'reducers/cart.js'


let mainCart = INITIAL_CART


describe('Cart Price Test', function() {

	for (var i = 0; i < 1000; i++) {

	  it('all prices should match', function () {
			mainCart = INITIAL_CART
			for (var i = 0; i < 60; i++) {

				let actions = [{f: addDetailAction}]
				let dLength = mainCart.get('details').size
				if(dLength > 0){
					actions.push({f: changeQuantity, p: Math.floor(Math.random() * dLength) })
					actions.push({f: removeDetail, p: Math.floor(Math.random() * dLength) })
					actions.push({f: checkUserCode})
				}

				let r = Math.floor(Math.random() * actions.length)
				let action = actions[r]
				action = action.f(action.p)
				mainCart = addDetailReducer(mainCart, action)
				mainCart = changeQuantityReducer(mainCart, action)
				mainCart = removeDetailReducer(mainCart, action)
				mainCart = checkUserCodeReducer(mainCart, action)
			}

			let cart = mainCart.toJS()
			assert.ok(cart.iva_total >= 0)
			let con = priceTotal(cart)
			assert.equal(cart.total, con.total)
	  })

	}


	for (var i = 0; i < 1000; i++) {

	  it('all conekta should match', function () {
			mainCart = INITIAL_CART
			for (var i = 0; i < 60; i++) {

				let actions = [{f: addDetailAction}]
				let dLength = mainCart.get('details').size
				if(dLength > 0){
					actions.push({f: changeQuantity, p: Math.floor(Math.random() * dLength) })
					actions.push({f: removeDetail, p: Math.floor(Math.random() * dLength) })
					actions.push({f: checkUserCode})
				}

				let r = Math.floor(Math.random() * actions.length)
				let action = actions[r]
				action = action.f(action.p)
				mainCart = addDetailReducer(mainCart, action)
				mainCart = changeQuantityReducer(mainCart, action)
				mainCart = removeDetailReducer(mainCart, action)
				mainCart = checkUserCodeReducer(mainCart, action)
			}

			let cart = mainCart.toJS()
			assert.ok(cart.iva_total >= 0)
			let con = conektaTotal(cart)
			assert.equal(cart.total, con.total)
	  })
	}


	afterEach(function() {
	  if (this.currentTest.state === 'failed') {
			let cart = mainCart.toJS()
			console.log(cart)
			let con1 = priceTotal(cart)
			let con2 = conektaTotal(cart)
			console.log(con1)
			console.log(con2)
	  }
	})


});
