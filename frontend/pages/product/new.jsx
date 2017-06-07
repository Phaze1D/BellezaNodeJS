import React, { PropTypes } from 'react'
import ProductForm from 'components/ProductForm/ProductForm'
import { connect } from 'react-redux'
import { getProduct, resetProduct, newProduct } from 'actions/product'
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

  handleSubmit(event) {
    this.props.dispatch(resetErrors())
    event.preventDefault()
    let elements = event.target.elements
    let formData = new FormData()
    formData.append('active', elements.active.checked)
    formData.append('fav', elements.fav.checked)
    formData.append('plu', elements.plu.value)
    formData.append('name', elements.name.value)
    formData.append('volume', elements.volume.value)
    formData.append('price', elements.price.value)
    formData.append('discount', elements.discount.value)
    formData.append('stock', elements.stock.value)
    formData.append('iva', elements.iva.value)

    if(elements['categories[]']){
      if(elements['categories[]'].length){
        elements['categories[]'].forEach(input => formData.append('categories[]', input.getAttribute('data-id')))
      }else{
        formData.append('categories[]', elements['categories[]'].getAttribute('data-id'))
      }
    }

    formData.append('description', window.tinymce.get('description').getContent())
    formData.append('benefits', window.tinymce.get('benefits').getContent())
    formData.append('ingredients', window.tinymce.get('ingredients').getContent())

    this.props.dispatch(newProduct(formData, this.props.user.get('token')))
    .then(this.handleSuccess)
    .catch(this.handleError)

  }

  handleSuccess(response) {
    this.props.history.push({
      pathname: '/backoffice/products'
    })
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
