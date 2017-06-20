import React from "react"
import ProductForm from "components/ProductForm/ProductForm"
import { connect } from "react-redux"
import { getProduct, resetProduct, editProduct } from "actions/product"
import { resetErrors } from "actions/errors"
import Loader from "components/Loader/Loader"




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
		this.handleSuccess = this.handleSuccess.bind(this)
	}

	componentDidMount() {
		let id = this.props.match.params.id
		this.props.dispatch(getProduct(id))
			.then()
			.catch(this.handleError)
	}

	componentWillUnmount() {
		this.props.dispatch(resetErrors())
		this.props.dispatch(resetProduct())
	}

	handleSubmit(event) {
		this.props.dispatch(resetErrors())
		event.preventDefault()
		let elements = event.target.elements
		let formData = new FormData()
		formData.append("active", elements.active.checked)
		formData.append("fav", elements.fav.checked)
		formData.append("plu", elements.plu.value)
		formData.append("name", elements.name.value)
		formData.append("volume", elements.volume.value)
		formData.append("price", Number(elements.price.value)*100)
		formData.append("discount", elements.discount.value)
		formData.append("stock", elements.stock.value)
		formData.append("iva", elements.iva.value)
		formData.append("main_image", elements.main_image.files[0])
		formData.append("second_image", elements.second_image.files[0])

		if(elements["categories[]"] && elements["categories[]"].length){
			elements["categories[]"].forEach(input => formData.append("categories[]", input.getAttribute("data-id")))
		}else if(elements["categories[]"]){
			formData.append("categories[]", elements["categories[]"].getAttribute("data-id"))
		}

		formData.append("description", window.tinymce.get("description").getContent())
		formData.append("benefits", window.tinymce.get("benefits").getContent())
		formData.append("ingredients", window.tinymce.get("ingredients").getContent())

		this.props.dispatch(editProduct(formData, this.props.product.get("id"), this.props.user.get("token")))
			.then(this.handleSuccess)
			.catch(this.handleError)

	}

	handleSuccess(response) {
		this.props.history.push({
			pathname: "/backoffice/products"
		})
	}

	handleError(response) {

	}

	render () {
		const {
			product,
			categories,
			errors
		} = this.props

		if(product.get("loading")){
			return <Loader></Loader>
		}

		return (
			<ProductForm
				product={product}
				categories={categories}
				errors={errors}
				onRequestSubmit={this.handleSubmit}/>
		)
	}
}

export default ProductsEdit
