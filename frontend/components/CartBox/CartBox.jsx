import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'


import {order} from '../../../fake'
const ord = order();

export default class Cart extends React.Component {

  render () {
    const detList = ord.details.map( (detail, index) =>
      <CartItem key={index} {...detail}/>
    )

    return (
      <div className="cart__box smooth">
        <h3>Tu Carrito</h3>

        <div className="cart__mid">
          {ord.details.length == 0 && <h4>No Hay Productos</h4>}
          <ul>
            {detList}
          </ul>
        </div>

        {ord.details.length > 0 &&
          <div className="cart__bottom smooth">
            <p><span>Sin IVA</span> Subtotal: ${ord.subtotal}</p>

            <Link className="button light" to="/cart">Detalles</Link>
          </div>
        }
      </div>
    )
  }
}


const CartItem = props => (
  <li className="cart__item">
    <img src={props.pimg}/>
    <div>
      <p className="overflow-text">{props.description}</p>
      <p><span>Cantidad:</span> {props.quantity}</p>
      <p><span>Precio:</span> ${props.price} </p>
    </div>
  </li>
)
