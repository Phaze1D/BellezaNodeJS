import React, { PropTypes } from 'react'
import ProductForm from 'components/ProductForm/ProductForm'
import { connect } from 'react-redux'
import { getProduct, resetProduct } from 'actions/product'


/**
* HTTP - GET
* @param {object} product - The full product info to edit
*
* HTTP - POST
* @param {object} product - The edited product to add
*
* LOCAL - POST
* @param {string} resetOne - A string to reset one property of the error object
*
* LOCAL - POST (on unmount)
* @param {object} resetAll - An empty object to reset errors
*/

@connect(store => {
  return {
    user: store.user,
    categories: store.categories,
    product: store.product
  }
})
class ProductsEdit extends React.Component {
  render () {
    return (
      <ProductForm/>
    )
  }
}

export default ProductsEdit;
