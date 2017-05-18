import React, { PropTypes } from 'react'
import ProductForm from 'components/ProductForm/ProductForm'
import { connect } from 'react-redux'
import { getProduct, resetProduct } from 'actions/product'

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

@connect(store => {
  return {
    user: store.user,
    categories: store.categories,
    product: store.product
  }
})
class ProductsNew extends React.Component {
  constructor(props){
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event){
    event.preventDefault()
    let elements = event.target.elements
  }

  render () {
    const {
      user,
      categories,
      product
    } = this.props

    return (
      <ProductForm
        product={product}
        categories={categories}
        onRequestSubmit={this.handleSubmit}/>
    )
  }
}

export default ProductsNew;
