import React, { PropTypes } from 'react'
import { Link, Redirect } from 'react-router-dom'
import OrderTable from 'components/OrderTable/OrderTable'
import { Address } from 'pages/checkout/confirmation'
import dateOptions from 'utils/date'
import { connect } from 'react-redux'
import { getOrder, resetOrder } from 'actions/order'



/**
* HTTP - GET
* @param {object} order - Full order info
*
* LOCAL - POST
* @param {object} reset - reset the order with empty object
*/

@connect( store => {
  return {
    order: store.order,
    user: store.user,
  }
})
class OrderShow extends React.Component {
  constructor(props){
    super(props)

    this.handleError = this.handleError.bind(this)
  }

  componentDidMount() {
    let user_id = this.props.match.params.id
    let id = this.props.match.params.order_id
    this.props.dispatch(getOrder(id, user_id, this.props.user.get('token')))
    .then()
    .catch(this.handleError)
  }

  componentWillUnmount() {
    this.props.dispatch(resetOrder())
  }

  handleError(response) {

  }

  render () {
    const {
      order,
      user,
      match
    } = this.props

    if( !(user.get('token') && user.get('id') === match.params.id) ){
      return <Redirect to='/home'/>
    }

    return (
      <main>
        <h2 className={`status-${order.get('status')}`}>Status: {order.get('status')}</h2>
        <h4 className="sub-text">Referencia: #{order.get('id')}</h4>
        <h4 className="sub-text">
          Fecha Realizado: {order.get('date').toLocaleString('en-us', dateOptions)}
        </h4>
        <div className="grid-wrap">
          <div className="col-9 col-md-8 col-sm-12">
            <OrderTable
              order={order}
              editable={false}/>
          </div>


          <div className="col-3 col-md-4 col-sm-12">
            <Address address={order.get('shippingAddress')} title="Dirección de Envío"/>
            <Address address={order.get('invoiceAddress')} title="Facturacion"/>
          </div>
        </div>
      </main>
    )
  }
}

export default OrderShow;
