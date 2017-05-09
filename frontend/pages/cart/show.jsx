import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import OrderTable from 'components/OrderTable/OrderTable'


class CartShow extends React.Component {
  constructor(props){
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(index, event){

  }

  render () {

    return (
      <main>
        <h2>
          Carrito
        </h2>

        <div className="cart__checkout">
          <Link to="/checkout" className="button dark"> Checkout </Link>
        </div>

        <OrderTable editable={true} size="lg"/>

        <div className="cart__checkout">
          <Link to="/checkout" className="button dark"> Checkout </Link>
        </div>

      </main>
    )
  }
}

export default CartShow;
