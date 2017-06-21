import React from "react"
import { Link } from "react-router-dom"
import OrderTable from "components/OrderTable/OrderTable"
import { connect } from "react-redux"
import { changeQuantity, removeDetail } from "actions/cart"


@connect( store => {
	return {
		cart: store.cart
	}
})
class CartShow extends React.Component {
	constructor(props){
		super(props)

		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleRemove = this.handleRemove.bind(this)
		this.handleError = this.handleError.bind(this)
	}

	handleInputChange(index, newQuantity){
		this.props.dispatch(changeQuantity(index, newQuantity))
	}

	handleRemove(index){
		this.props.dispatch(removeDetail(index))
	}

	handleError(response){

	}

	render () {

		return (
			<main>
				<h2>
          Carrito
				</h2>

				{this.props.cart.get("details").size > 0 &&
					<div className="grid end center" style={{margin: "10px 0"}}>
						<Link to="/checkout" className="dark-button"> Checkout </Link>
					</div>
				}

				{this.props.cart.get("details").size > 0 &&
					<OrderTable
						order={this.props.cart}
						editable={true}
						onRequestInputChange={this.handleInputChange}
						onRequestError={this.handleError}
						onRequestRemove={this.handleRemove}/>
				}

				{this.props.cart.get("details").size > 0 &&
					<div className="grid end center" style={{margin: "10px 0"}}>
						<Link to="/checkout" className="dark-button"> Checkout </Link>
					</div>
				}

				{this.props.cart.get("details").size == 0 &&
					<h1 className="sub-text">Tu Carrito Esta Vacío</h1>
				}
			</main>
		)
	}
}

export default CartShow
