import React from 'react'
import { Link } from 'react-router-dom'
import { addDetail } from 'actions/cart'



/**
* LOCAL - POST
* @param {object} cartDetail - Adds a product to the cart
*/
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
        name: product.get('name') + product.get('volume'),
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
          <img src={product.get('mediumImg')} alt={product.get('name')}/>
          <h4 className="overflow-text">{product.get('name')}</h4>
          <p>${(product.get('price')/100).toFixed(2)}</p>
        </Link>

        {product.get('stock') > 0 ?
          <form onSubmit={this.handleAddDetail}>
            <input className="secondary-button" type="submit" value="Agregar al Carrito"/>
            <input name="quantity" type="number" min="0" max={product.get('stock')} defaultValue="1"/>
          </form>
          :
          <input className="secondary-button" type="submit" value="Agotado" disabled/>
        }
      </article>
    )
  }
}
