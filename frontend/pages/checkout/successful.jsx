import React, { PropTypes } from 'react'
import { Address } from './confirmation'
import OrderTable from 'components/OrderTable/OrderTable'
import { connect } from 'react-redux'
import { resetCart } from 'actions/cart'

/**
* LOCAL - GET
* @param {object} user - The current logged in user
*
* LOCAL - GET
* @param {object} cartOrder - The current cart order
*
* LOCAL - POST (on unmount)
* @param {object} reset - Reset the current cart order with empty object
*/

@connect( store => {
  return {
    cart: store.cart,
    user: store.user,
    payment: store.payment
  }
})
class CheckoutSuccessful extends React.Component {

  componentWillUnmount() {
    this.props.dispatch(resetCart())
  }

  render () {
    const {
      cart,
      user,
      payment,
    } = this.props

    if(!user.get('token')){
      return <Redirect to='/home'/>
    }

    return (
      <main>
        <h2 className="col-8 col-xs-12" style={{color: '#1eab30'}}>Procesado su Pedido</h2>
        <p className="col-8 col-xs-12">
          Tu pedido está siendo procesado
          <br/>
					Te hemos enviado instrucciones a su correo electrónico
          (<span className="sub-text light"> {user.get('email')} </span>) acerca de su estado de la orden
          <br/>
				  Cuando hayamos confirmado su pago, usted recibirá información sobre su envío.
        </p>

        <div className="col-8 col-xs-12">
          <Address address={cart.get('shippingAddress')} title="Dirección de Envío"/>
          {!cart.get('invoiceAddress').isEmpty() &&
            <Address address={cart.get('invoiceAddress')} title="Facturacion" rfc={cart.get('rfc')} razonSocial={cart.get('razon_social')}/>
          }
          <OrderTable
            order={cart}
            editable={false}/>
        </div>
      </main>
    )
  }
}

export default CheckoutSuccessful;
