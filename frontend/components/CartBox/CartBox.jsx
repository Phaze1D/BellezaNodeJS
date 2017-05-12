import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'


const ord = {}

export default class CartBox extends React.Component {

  render () {
    const detList = ord.details.map( (detail, index) =>
      <CartItem key={index} {...detail}/>
    )

    return (
      <div
        className="cart-box"
        onMouseEnter={(event) => document.body.style.overflow = "hidden"}
        onMouseLeave={(event) => document.body.style.overflow = ""}>
        <h3>Tu Carrito</h3>

        <div className="cart-mid">
          {ord.details.length == 0 && <h4>No Hay Productos</h4>}
          <ul>
            {detList}
          </ul>
        </div>

        {ord.details.length > 0 &&
          <div className="cart-bottom">
            <Link className="light-button margin-button" to="/cart">Detalles</Link>
            <Link className="dark-button margin-button" to="/checkout">Checkout</Link>
          </div>
        }
      </div>
    )
  }
}


const CartItem = props => (
  <li className="cart-item">
    <img src={props.pimg}/>
    <div>
      <p className="overflow-text">{props.description}</p>
      <p><span className="sub-text">Cantidad:</span> {props.quantity}</p>
      <p><span className="sub-text">Precio:</span> ${props.price} </p>
    </div>
  </li>
)
