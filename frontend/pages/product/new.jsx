import React, { PropTypes } from 'react'
import ProductForm from 'components/ProductForm/ProductForm'

/**
* HTTP - POST
* @param {object} product - The new product to add
*
* LOCAL - POST
* @param {string} resetOne - A string to reset one property of the error object
*
* LOCAL - POST (on unmount)
* @param {object} resetAll - An empty object to reset errors
*/

class ProductsNew extends React.Component {
  render () {
    return (
      <ProductForm/>
    )
  }
}

export default ProductsNew;
