import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination/Pagination'
import dateOptions from 'utils/date'

const ords = []
const links = [];
for (var i = 0; i < 12; i++) links.push({value: "#", name: i+1})

/**
* HTTP - GET
* @param {array} orders - An array of orders
*
* LOCAL - POST (on unmount)
* @param {array} reset - An empty array to reset orders array
*/

class BackofficeOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {page: 0}
  }

  render () {

    const orderList = ords.map( (order, index) =>
      <OrderRow key={index} {...order}/>
    )

    return (
      <div>

        <ul className="backorders-nav">
          <li>Pending Payment</li>
          <li>Paid</li>
        </ul>

        <table className="backoffice-table">
          <thead>
            <tr>
              <th>Referencia</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {orderList}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="5">
                <Pagination
                  links={links}
                  page={this.state.page}
                  onRequestClick={this.handlePageClick}/>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

export default BackofficeOrders;


const OrderRow = props => (
  <tr>
    <td>{props.id}</td>
    <td>{props.date.toLocaleString('en-us', dateOptions)}</td>
    <td>{props.user.firstName} {props.user.lastName}</td>
    <td>${props.total}</td>
    <td>
      <Link to="/order">Details</Link>
    </td>
  </tr>
)
