import React from 'react'
import { Link } from 'react-router-dom'
import { addDetail } from 'actions/cart'
import QuantityDrop from 'components/QuantityDrop/QuantityDrop'


export default class ProductResult extends React.PureComponent {
	constructor(props) {
		super(props)

		this.handleAddDetail = this.handleAddDetail.bind(this)
	}

	handleAddDetail(event) {
		event.preventDefault()
		let quantity = Number(event.target.elements['quantity'].value)
		let product = this.props.product

		if(quantity > 0 && quantity <= product.get('stock') ){
			let detail = {
				product_id: product.get('id'),
				plu: product.get('plu'),
				name: product.get('name') + ' ' + product.get('volume'),
				price: product.get('price'),
				iva: product.get('iva'),
				discount: product.get('discount'),
				sub_total: product.get('price') * quantity,
				stock: product.get('stock'),
				quantity: quantity
			}
			detail.sub_total -= detail.sub_total * (detail.discount/100)
			this.props.dispatch(addDetail(detail))
		}
	}

	render() {
		const {
			product
		} = this.props

		return (
			<article className="col-3 col-md-4 col-xs-6 col-xxs-12 product-cell">
				<Link to={`/product/${product.get('id')}`}>
					<picture>
						<img src={`https://s3-us-west-1.amazonaws.com/belleza-node/products/xs/${product.get('plu')}.jpg`} alt={product.get('name')}/>
					</picture>
					<h4 className="overflow-text">{product.get('name')}</h4>
					<p>${((product.get('price') * (1 - product.get('discount')/100))/100).toFixed(2)}</p>
				</Link>

				{product.get('stock') > 0 ?
					<form onSubmit={this.handleAddDetail}>
						<input className="secondary-button" type="submit" value="Agregar al Carrito" style={{marginRight: '5px'}}/>
						<QuantityDrop stock={product.get('stock')}/>
					</form>
					:
					<input className="secondary-button" type="submit" value="Agotado" disabled/>
				}
			</article>
		)
	}
}
