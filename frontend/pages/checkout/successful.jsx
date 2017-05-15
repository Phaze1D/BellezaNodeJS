import React, { PropTypes } from 'react'
import { Address } from './confirmation'
import OrderTable from 'components/OrderTable/OrderTable'

const ord = {details: []}

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

class CheckoutSuccessful extends React.Component {
  render () {

    return (
      <main>
        <h2 className="col-8 col-xs-12" style={{color: '#1eab30'}}>Procesado su Pedido</h2>
        <p className="col-8 col-xs-12">
          Tu pedido está siendo procesado
          <br/>
					Te hemos enviado instrucciones a su correo electrónico
          (<span className="sub-text light"> footdavid@hotmail.com </span>) acerca de su estado de la orden
          <br/>
				  Cuando hayamos confirmado su pago, usted recibirá información sobre su envío.
        </p>

        <div className="col-8 col-xs-12">
          <Address {...ord.shippedTo} title="Dirección de Envío"/>
          <Address {...ord.invoiceTo} title="Facturacion"/>
          <OrderTable editable={false} size="sm"/>
        </div>
      </main>
    )
  }
}

export default CheckoutSuccessful;
