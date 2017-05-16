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
export default class ProductResult extends React.Component {
  constructor(props) {
    super(props)

    this.handleAddDetail = this.handleAddDetail.bind(this)
  }

  handleAddDetail(event) {
    event.preventDefault()
    let quantity = Number(event.target.elements['quantity'].value)

    if(quantity > 0 && quantity <= this.props.stock){
      this.props.dispatch(addDetail({
        id: this.props.id,
        name: this.props.name,
        price: this.props.price,
        iva: this.props.iva,
        discount: this.props.discount,
        subTotal: (this.props.price * quantity) * (this.props.discount/100),
        stock: this.props.stock,
        quantity: quantity,
        mediumImg: this.props.mediumImg,
        smallImg: this.props.smallImg,
      }))
    }
  }

  render() {
    const {
      id,
      name,
      mediumImg,
      price,
    } = this.props

    return (
      <article className="col-3 col-md-4 col-xs-6 col-xxs-12 product-cell">
        <Link to={`/product/${id}`}>
          <img src={mediumImg} alt={name}/>
          <h4 className="overflow-text">{name}</h4>
          <p>${price}</p>
        </Link>

        <form onSubmit={this.handleAddDetail}>
          <input className="secondary-button" type="submit" value="Agregar al Carrito"/>
          <input name="quantity" type="number" min="0" max="10" defaultValue="1"/>
        </form>
      </article>
    )
  }
}
