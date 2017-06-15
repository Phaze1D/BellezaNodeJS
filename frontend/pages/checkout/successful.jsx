import React, { PropTypes } from 'react'
import { Link, Redirect } from 'react-router-dom'
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
    } = this.props

    if(!user.get('token')){
      return <Redirect to='/home'/>
    }

    return (
      <main>
        {cart.getIn(['charges', 'payment_method', 'type']) === 'oxxo' &&
          <OxxoSuccess
            email={user.get('email')}
            total={cart.get('total')}
            reference={cart.getIn(['charges', 'payment_method', 'reference'])}/>
        }

        {cart.getIn(['charges', 'payment_method', 'type']) === 'credit' &&
          <CardSuccess email={user.get('email')}/>
        }

        { cart.getIn(['charges', 'payment_method', 'type']) === 'spei' &&
          <BankSuccess
            email={user.get('email')}
            total={cart.get('total')}
            clabe={cart.getIn(['charges', 'payment_method', 'clabe'])}/>
        }

        <div className="col-8 col-xs-12">
          <Address address={cart.get('shippingAddress')} title="Dirección de Envío"/>
          {!cart.get('invoiceAddress').isEmpty() &&
            <Address
              address={cart.get('invoiceAddress')}
              title="Facturacion"
              rfc={cart.get('rfc')}
              razonSocial={cart.get('razon_social')}/>
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


const CardSuccess = (props) => (
  <div className="col-8 col-xs-12">
    <h2 style={{color: '#1eab30'}}>Pago Exitoso</h2>
    <p>
      Tu pedido está siendo procesado
      <br/>
      Te hemos enviado instrucciones a su correo electrónico
      (<span className="sub-text light"> {props.email} </span>) acerca de su estado de la orden
      <br/>
    </p>
  </div>
)


const OxxoSuccess = (props) => (
  <div className="col-8 col-xs-12">
    <h2 style={{color: '#FFC107'}}>En Espera de Pago</h2>
    <p>
      Cuando el pago se ha hecho, enviaremos su pedido
      <br/>
      Te hemos enviado instrucciones a su correo electrónico
      (<span className="sub-text light">{props.email}</span>) acerca de su estado de la orden
      <br/>
    </p>

    <div className="oxxo-sub">
      <div className="opps-info">
        <div className="opps-brand"><img src="https://s3-us-west-1.amazonaws.com/belleza-node/web/oxxopay.png" alt="OXXOPay"/></div>
        <div className="opps-amount">
          <h3>Monto a pagar</h3>
          <h2>${(props.total/100).toFixed(2)}<sup>MXN</sup></h2>
          <p className="sub-text">OXXO cobrará una comisión adicional al momento de realizar el pago.</p>
          <p className="sub-text">Esto expira en 3 días</p>
        </div>
      </div>

      <div className="box ref-box">
        <h3>Referencia</h3>
        <h1>{props.reference}</h1>
      </div>

      <h3>Instrucciones</h3>

      <ol>
        <li>Acude a la tienda OXXO más cercana. <a href="https://www.google.com.mx/maps/search/oxxo/" target="_blank">Encuéntrala aquí</a>.</li>
        <li>Indica en caja que quieres ralizar un pago de <strong>OXXOPay</strong>.</li>
        <li>Dicta al cajero el número de referencia en esta ficha para que tecleé directamete en la pantalla de venta.</li>
        <li>Realiza el pago correspondiente con dinero en efectivo.</li>
        <li>Al confirmar tu pago, el cajero te entregará un comprobante impreso.
          En el podrás verificar que se haya realizado correctamente.
          Conserva este comprobante de pago.
        </li>
      </ol>
    </div>
  </div>
)

const BankSuccess = (props) => (
  <div className="col-8 col-xs-12">
    <h2 style={{color: '#FFC107'}}>En Espera de Pago</h2>
    <p>
      Cuando el pago se ha hecho, enviaremos su pedido
      <br/>
      Te hemos enviado instrucciones a su correo electrónico
      (<span className="sub-text light">{props.email}</span>) acerca de su estado de la orden
      <br/>
    </p>

    <div className="oxxo-sub">
      <div className="opps-info">
        <div className="opps-brand"><img src="https://s3-us-west-1.amazonaws.com/belleza-node/web/spei.png" alt="SPEI"/></div>
        <div className="opps-amount">
          <h3>Monto a pagar</h3>
          <h2>${(props.total/100).toFixed(2)}<sup>MXN</sup></h2>
          <p className="sub-text">Esto expira en 3 días</p>
        </div>
      </div>

      <div className="box ref-box">
        <h3>Clabe</h3>
        <h1>{props.clabe}</h1>
      </div>

      <h3>Instrucciones</h3>

      <ol>
				<li>Accede a tu banca en línea.</li>
				<li>Da de alta la CLABE en esta ficha. <strong>El banco deberá de ser STP</strong>.</li>
				<li>Realiza la transferencia correspondiente por la cantidad exacta en esta ficha, <strong>de lo contrario se rechazará el cargo</strong>.</li>
				<li>Al confirmar tu pago, el portal de tu banco generará un comprobante digital. <strong>En el podrás verificar que se haya realizado correctamente.</strong> Conserva este comprobante de pago.</li>
      </ol>
    </div>
  </div>
)
