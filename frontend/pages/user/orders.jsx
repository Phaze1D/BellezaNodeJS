import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import OrderItem from 'components/OrderItem/OrderItem'
import Pagination from 'components/Pagination/Pagination'

const ords = []
const links = [];
for (var i = 0; i < 12; i++) links.push({value: "#", name: i+1})

/**
* HTTP - GET
* @param {array} orders - An array of the current users orders
*
* LOCAL - POST
* @param {object} resetLogout - Logouts the user by reseting it with empty object
*
* LOCAL - POST (on unmount)
* @param {array} resetOrders - An empty array to reset the user orders
*/

export default class UserOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {page: 0}
  }

  render () {

    const orderList = ords.map( (order, index) =>
      <OrderItem key={index} {...order}/>
    )


    return (
      <section className="col-9 col-sm-8 col-xs-11">
        <h2>
          Mis Pedidos
          <Link to="#" className="sub-text light" style={{float: 'right'}}>Salir</Link>
        </h2>

        {orderList}
        <Pagination
          links={links}
          page={this.state.page}
          onRequestClick={this.handlePageClick}/>
      </section>
    )
  }
}
