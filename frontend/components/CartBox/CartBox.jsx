import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'


export default class CartBox extends React.PureComponent {
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
      cart,
      show
    } = this.props


    const detList = cart.get('details').map( (detail, index) =>
      <CartItem key={index} detail={detail}/>
    )

    const boxClasses = classnames('cart-box', {'show': show})

    return (
      <div
        className={boxClasses}
        onMouseEnter={(event) => document.body.style.overflow = "hidden"}
        onMouseLeave={this.handleMouseLeave}>
        <h3>Tu Carrito</h3>

        <div className="cart-mid">
          {cart.get('details').size == 0 && <h4 className="sub-text">No Hay Productos</h4>}
          <ul>
            {detList}
          </ul>
        </div>

        {cart.get('details').size > 0 &&
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
    <img src={props.detail.get('pimg')}/>
    <div>
      <p className="overflow-text">{props.detail.get('name')}</p>
      <p><span className="sub-text">Cantidad:</span> {props.detail.get('quantity')}</p>
      <p><span className="sub-text">Precio:</span> ${props.detail.get('price')} </p>
    </div>
  </li>
)
