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

        <div className="grid end center" style={{margin: '10px 0'}}>
          <Link to="/checkout" className="dark-button"> Checkout </Link>
        </div>

        <OrderTable editable={true} size="lg"/>

        <div className="grid end center" style={{margin: '10px 0'}}>
          <Link to="/checkout" className="dark-button"> Checkout </Link>
        </div>


      </main>
    )
  }
}

export default CartShow;
