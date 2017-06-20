import React from "react"
import { connect } from "react-redux"
import ProductResult from "components/ProductResult/ProductResult"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import { getProduct, resetProduct } from "actions/product"
import { addDetail } from "actions/cart"
import Loader from "components/Loader/Loader"
import QuantityDrop from "components/QuantityDrop/QuantityDrop"


/**
* HTTP - GET
* @param {object} product - Entire product object with summaries
*
* LOCAL - POST
* @param {object} cartDetail - Adds a product to the cart
*
* LOCAL - POST (on unmount)
* @param {object} reset - An empty object to reset product
*/

@connect( store => {
	return {
		product: store.product
	}
})
export default class ProductShow extends React.Component {
	constructor(props){
		super(props)

		this.handleUrlChanged = this.handleUrlChanged.bind(this)
		this.handleError = this.handleError.bind(this)
		this.handleAddDetail = this.handleAddDetail.bind(this)
		this.unlisten = null
		Tabs.setUseDefaultStyles(false)
	}

	componentWillMount() {
		this.handleUrlChanged(this.props.history.location)
		this.unlisten = this.props.history.listen(this.handleUrlChanged)
	}


	componentDidUpdate(prevProps, prevState){
		let oldParams = prevProps.match.params
		let newParams = this.props.match.params

		if(newParams.id !== oldParams.id){
			this.props.dispatch(resetProduct())
			this.handleUrlChanged(this.props.history.location)
		}
	}

	componentWillUnmount() {
		this.unlisten()
		this.props.dispatch(resetProduct())
	}

	handleUrlChanged(location) {
		if(this.props.match.url === location.pathname){
			const id = this.props.match.params.id
			this.props.dispatch(getProduct(id))
				.then()
				.catch(this.handleError)
		}
	}

	handleAddDetail(event) {
		event.preventDefault()
		let quantity = Number(event.target.elements["quantity"].value)
		let product = this.props.product

		if(quantity > 0 && quantity <= product.get("stock") ){
			let detail = {
				product_id: product.get("id"),
				plu: product.get("plu"),
				name: product.get("name") + " " +  product.get("volume"),
				price: product.get("price"),
				iva: product.get("iva"),
				discount: product.get("discount"),
				sub_total: product.get("price") * quantity,
				stock: product.get("stock"),
				quantity: quantity,
			}
			detail.sub_total -= detail.sub_total * (detail.discount/100)
			this.props.dispatch(addDetail(detail))
		}
	}

	handleError(response) {
		this.props.history.push({
			pathname: "/home",
		})
	}

	handleShowSec(event){
		document.getElementById("product-main").style.display="none"
		document.getElementById("product-sec").style.display=""
	}

	handleHideSec(event){
		document.getElementById("product-main").style.display=""
		document.getElementById("product-sec").style.display="none"
	}

	render() {
		const {
			product,
			dispatch
		} = this.props

		const price = product.get("price") ? (product.get("price")/100).toFixed(2) : 0

		const relatList = product.get("related").map( (rproduct, index) =>
			<ProductResult key={index} product={rproduct} dispatch={dispatch}/>
		)

		if(!product.get("plu")){
			return <Loader></Loader>
		}

		return (
			<main>
				<section className="grid-wrap top around">
					<div id="product-mini" className="col-1 col-xs-2 col-xxs-3">
						<img src={`https://s3-us-west-1.amazonaws.com/belleza-node/products/xxs/${product.get("plu")}.jpg`}/>
						<img
							src={`https://s3-us-west-1.amazonaws.com/belleza-node/products/xxs/${product.get("plu")}_2.jpg`}
							onMouseEnter={this.handleShowSec}
							onMouseLeave={this.handleHideSec}
							onError={(event) => event.target.style.display = "none"}/>
					</div>

					<picture id="product-main" className="col-5 col-md-4 col-sm-6 col-xxs-8 product-main">
						<source
							srcSet={`https://s3-us-west-1.amazonaws.com/belleza-node/products/sm/${product.get("plu")}.jpg`}
							media="(max-width: 463px)"/>
						<source
							srcSet={`https://s3-us-west-1.amazonaws.com/belleza-node/products/md/${product.get("plu")}.jpg`}
							media="(max-width: 942px)"/>
						<img src={`https://s3-us-west-1.amazonaws.com/belleza-node/products/lg/${product.get("plu")}.jpg`}/>
					</picture>


					<picture id="product-sec" className="col-5 col-md-4 col-sm-6 col-xxs-8 product-main" style={{display: "none"}}>
						<source
							srcSet={`https://s3-us-west-1.amazonaws.com/belleza-node/products/sm/${product.get("plu")}_2.jpg`}
							media="(max-width: 463px)"/>
						<source
							srcSet={`https://s3-us-west-1.amazonaws.com/belleza-node/products/md/${product.get("plu")}_2.jpg`}
							media="(max-width: 942px)"/>
						<img src={`https://s3-us-west-1.amazonaws.com/belleza-node/products/lg/${product.get("plu")}_2.jpg`}/>
					</picture>


					<div className="col-5 col-md-6 col-sm-12">
						<h2>{product.get("name")}</h2>
						<div className="grid-wrap center around">
							<div className="col-8 col-xxs-12">
								<p className="sub-text">PLU: {product.get("plu")} / Disponibles: {product.get("stock")}</p>
								<p className="sub-text primary">${price} / {product.get("volume")}</p>
								{product.get("discount") > 0 &&
									<p className="discount-text">Con {product.get("discount")}% de Descuento </p>
								}
							</div>

							{product.get("stock") > 0 ?
								<form className="col-4 col-xxs-12 grid end" onSubmit={this.handleAddDetail}>
									<input className="secondary-button raise grow" type="submit" value="Agregar" style={{marginRight: "5px"}}/>
									<QuantityDrop stock={product.get("stock")}/>
								</form>
								:
								<input className="secondary-button" type="submit" value="Agotado" disabled/>
							}
						</div>

						<Tabs className="tabs">

							<TabList className="tablist">
								<Tab className="tab">Descripción</Tab>
								<Tab className="tab">Beneficios y Usos</Tab>
								<Tab className="tab">Ingredientes</Tab>
							</TabList>

							<TabPanel
								className="tab-panel">
								<div className="tinymce-default" dangerouslySetInnerHTML={{__html: product.get("description")}}>
								</div>
							</TabPanel>

							<TabPanel
								className="tab-panel">
								<div className="tinymce-default" dangerouslySetInnerHTML={{__html: product.get("benefits")}}>
								</div>
							</TabPanel>

							<TabPanel
								className="tab-panel">
								<div className="tinymce-default" dangerouslySetInnerHTML={{__html: product.get("ingredients")}}>
								</div>
							</TabPanel>
						</Tabs>

					</div>
				</section>

				<section>
					<h3 className="h-underline">Productos Relacionados</h3>
					<div className="grid-wrap">
						{relatList}
					</div>
				</section>
			</main>
		)
	}
}
