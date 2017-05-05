import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import OrderItem from 'components/OrderItem/OrderItem'
import Pagination from 'components/Pagination/Pagination'

import {orders} from '../../../fake.js'

const ord = orders()
const links = [];
for (var i = 0; i < 12; i++) links.push({value: "#", name: i+1})

export default class UserOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {selectedIndex: 0}
  }

  render () {

    const orderList = ord.map( (order, index) =>
      <OrderItem key={index} {...order}/>
    )


    return (
      <section className="user__section smooth">
        <h2>
          Mis Pedidos
          <Link to="#">Salir</Link>
        </h2>

        {orderList}
        <Pagination
          links={links}
          selectedIndex={this.state.selectedIndex}
          onRequestClick={this.handlePageClick}/>
      </section>
    )
  }
}
