import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import OrderItem from 'components/OrderItem/OrderItem'
import Pagination from 'components/Pagination/Pagination'
import { connect } from 'react-redux'
import { userLogout } from 'actions/user'
import { resetOrders, getOrders } from 'actions/order'
import queryString from 'query-string'


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

@connect(store => {
  return {
    orders: store.orders,
    user: store.user
  }
})
export default class UserOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {page: 0, prePage: 20}

    this.handleUrlChanged = this.handleUrlChanged.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleError = this.handleError.bind(this)
    this.unlisten = null
  }

  componentDidMount() {
    this.handleUrlChanged(this.props.history.location, this.props.history.action)
    this.unlisten = this.props.history.listen(this.handleUrlChanged)
  }

  componentWillUnmount() {
    this.unlisten()
    this.props.dispatch(resetOrders())
  }

  handleUrlChanged(location, action) {
    if(this.props.match.url === location.pathname){
      const parse = queryString.parse(location.search)
      let user_id = this.props.match.params.id
      this.props.dispatch(getOrders(parse.page, user_id, this.props.user.get('token')))
      .then()
      .catch(this.handleError)
    }
  }

  handleLogout(event) {
    event.preventDefault()
    this.props.dispatch(userLogout())
  }

  handlePageClick(index, event){
    this.setState({page: index})
  }

  handleError(response) {

  }

  render () {
    const {
      orders,
      match
    } = this.props

    const orderList = orders.get('rows').map( (order, index) =>
      <OrderItem key={index} order={order}/>
    )

    const links = []
    for(let i = 0; i < Math.ceil(orders.get('count')/this.state.prePage); i++ ){
      links.push({value: `${match.url}?page=${i}`, name: i+1})
    }

    return (
      <section className="col-9 col-sm-8 col-xs-11">
        <h2>
          Mis Pedidos
          <Link to="#" className="sub-text light" style={{float: 'right'}}
            onClick={this.handleLogout}>Salir</Link>
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
