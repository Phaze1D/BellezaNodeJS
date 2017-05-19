import React, { PropTypes } from 'react'
import ProductForm from 'components/ProductForm/ProductForm'
import { connect } from 'react-redux'
import { getProduct, resetProduct } from 'actions/product'
import { resetErrors } from 'actions/errors'



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
    product: store.product,
    errors: store.errors
  }
})
class ProductsEdit extends React.Component {
  constructor(props){
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentDidMount() {
    let id = this.props.match.params.id
    this.props.dispatch(getProduct(id))
    .then()
    .catch(this.handleError)
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors())
  }

  handleSubmit(event) {
    event.preventDefault()
    let elements = event.target.elements
  }

  handleError(response) {

  }

  render () {
    const {
      product,
      categories,
      user,
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

export default ProductsEdit;
