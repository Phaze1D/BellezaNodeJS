import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import OrderTable from 'components/OrderTable/OrderTable'
import { connect } from 'react-redux'
import { changeQuantity, removeDetail } from 'actions/cart'


/**
* LOCAL - GET
* @param {object} cart - The current cart order
*
* LOCAL - POST
* @param {object} cart - The new modified cart order
*/

@connect( store => {
  return {
    cart: store.cart
  }
})
class CartShow extends React.Component {
  constructor(props){
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleInputChange(index, newQuantity){
    this.props.dispatch(changeQuantity(index, newQuantity))
  }

  handleRemove(index){
    this.props.dispatch(removeDetail(index))
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

        <OrderTable
          order={this.props.cart}
          editable={true}
          onRequestInputChange={this.handleInputChange}
          onRequestRemove={this.handleRemove}/>

        <div className="grid end center" style={{margin: '10px 0'}}>
          <Link to="/checkout" className="dark-button"> Checkout </Link>
        </div>


      </main>
    )
  }
}

export default CartShow;
