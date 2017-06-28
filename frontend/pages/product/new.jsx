import React from 'react'
import ProductForm from 'components/ProductForm/ProductForm'
import { connect } from 'react-redux'
import { newProduct } from 'actions/product'
import { resetErrors } from 'actions/errors'


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
		formData.append('price', Number(elements.price.value)*100)
		formData.append('discount', elements.discount.value)
		formData.append('stock', elements.stock.value)
		formData.append('iva', elements.iva.value)
		formData.append('main_image', elements.main_image.files[0])
		formData.append('second_image', elements.second_image.files[0])

		if(elements['categories[]'] && elements['categories[]'].length){
			elements['categories[]'].forEach(input => formData.append('categories[]', input.getAttribute('data-id')))
		}else if(elements['categories[]']){
			formData.append('categories[]', elements['categories[]'].getAttribute('data-id'))
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

export default ProductsNew
