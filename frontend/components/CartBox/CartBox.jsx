import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'


export default class CartBox extends React.Component {
  constructor(props){
    super(props)

    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseLeave(event) {
    document.body.style.overflow = ""
    this.props.onRequestMouseLeave()
  }

  render () {
    const {
      details,
      show
    } = this.props

    const detList = details.map( (detail, index) =>
      <CartItem key={index} {...detail}/>
    )

    const boxClasses = classnames('cart-box', {'show': show})

    return (
      <div
        className={boxClasses}
        onMouseEnter={(event) => document.body.style.overflow = "hidden"}
        onMouseLeave={this.handleMouseLeave}>
        <h3>Tu Carrito</h3>

        <div className="cart-mid">
          {details.length == 0 && <h4 className="sub-text">No Hay Productos</h4>}
          <ul>
            {detList}
          </ul>
        </div>

        {details.length > 0 &&
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
      <p className="overflow-text">{props.name}</p>
      <p><span className="sub-text">Cantidad:</span> {props.quantity}</p>
      <p><span className="sub-text">Precio:</span> ${props.price} </p>
    </div>
  </li>
)
