import assert from 'assert'
import {
	newDetail ,
	addDetailAction,
	changeQuantity,
	removeDetail,
	checkUserCode
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
  it('all prices should match', function () {
  	assert.equal(2, 1);
  })
});
