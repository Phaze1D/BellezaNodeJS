import React, { PropTypes } from 'react'
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
          <a href="#" className="button dark"> Checkout </a>
        </div>

        <OrderTable/>

        <div className="cart__checkout">
          <a href="#" className="button dark"> Checkout </a>
        </div>

      </main>
    )
  }
}

export default CartShow;
