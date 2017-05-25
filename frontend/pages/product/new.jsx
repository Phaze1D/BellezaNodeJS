import React, { PropTypes } from 'react'
import ProductForm from 'components/ProductForm/ProductForm'
import { connect } from 'react-redux'
import { getProduct, resetProduct } from 'actions/product'
import { resetErrors } from 'actions/errors'

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
    product: store.product,
    errors: store.errors
  }
})
class ProductsNew extends React.Component {
  constructor(props){
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors())
  }

  handleSubmit(event){
    this.props.dispatch(resetErrors())
    event.preventDefault()
    let elements = event.target.elements
  }

  handleSuccess(response) {

  }

  handleError(response) {

  }

  render () {
    const {
      user,
      categories,
      product,
      errors
    } = this.props

    return (
      <ProductForm
        product={product}
        categories={categories}
        errors={errors}
        onRequestSubmit={this.handleSubmit}/>
    )
  }
}

export default ProductsNew;
