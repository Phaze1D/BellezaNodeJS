import React, { PropTypes } from 'react'
import { Address } from './confirmation'
import OrderTable from 'components/OrderTable/OrderTable'


import {order} from '../../../fake'
const ord = order()

class CheckoutSuccessful extends React.Component {
  render () {

    return (
      <main className="grid-flex">
        <h2 className="col-8" style={{color: '#1eab30'}}>Procesado su Pedido</h2>
        <p className="col-8">
          Tu pedido está siendo procesado
          <br/>
					Te hemos enviado instrucciones a su correo electrónico
          (<span className="sub-text light"> footdavid@hotmail.com </span>) acerca de su estado de la orden
          <br/>
				  Cuando hayamos confirmado su pago, usted recibirá información sobre su envío.
        </p>

        <div className="col-8">
          <Address {...ord.shippedTo} title="Dirección de Envío"/>
          <Address {...ord.invoiceTo} title="Facturacion"/>
          <OrderTable editable={false} size="sm"/>
        </div>
      </main>
    )
  }
}

export default CheckoutSuccessful;
