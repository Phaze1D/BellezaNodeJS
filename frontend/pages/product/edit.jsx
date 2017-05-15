import React, { PropTypes } from 'react'
import ProductForm from 'components/ProductForm/ProductForm'


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

class ProductsEdit extends React.Component {
  render () {
    return (
      <ProductForm/>
    )
  }
}

export default ProductsEdit;
