import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addDetail } from 'actions/cart'



/**
* LOCAL - POST
* @param {object} cartDetail - Adds a product to the cart
*/
@connect( store => {
  return {}
})
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
        id: product.get('id'),
        name: product.get('name'),
        price: product.get('price'),
        iva: product.get('iva'),
        discount: product.get('discount'),
        subTotal: product.get('price') * quantity,
        stock: product.get('stock'),
        quantity: quantity,
        mediumImg: product.get('mediumImg'),
        smallImg: product.get('smallImg'),
      }
      detail.subTotal -= detail.subTotal * (detail.discount/100)
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
          <img src={product.get('mediumImg')} alt={product.get('name')}/>
          <h4 className="overflow-text">{product.get('name')}</h4>
          <p>${product.get('price')}</p>
        </Link>

        <form onSubmit={this.handleAddDetail}>
          <input className="secondary-button" type="submit" value="Agregar al Carrito"/>
          <input name="quantity" type="number" min="0" max="10" defaultValue="1"/>
        </form>
      </article>
    )
  }
}
