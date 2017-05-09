import React, { PropTypes } from 'react'
import { Address } from './confirmation'
import OrderTable from 'components/OrderTable/OrderTable'


import {order} from '../../../fake'
const ord = order()

class CheckoutSuccessful extends React.Component {
  render () {

    return (
      <main className="successful-wrapper">
        <h2 className="green-h">Procesado su Pedido</h2>
        <p>Tu pedido está siendo procesado</p>
        <p>
					Te hemos enviado instrucciones a su correo electrónico (<span className="sub"> footdavid@hotmail.com </span>) acerca de su estado de la orden
				</p>
        <p>Cuando hayamos confirmado su pago, usted recibirá información sobre su envío.</p>

        <Address {...ord.shippedTo} title="Dirección de Envío"/>
        <Address {...ord.invoiceTo} title="Facturacion"/>

        <OrderTable editable={false} size="sm"/>
      </main>
    )
  }
}

export default CheckoutSuccessful;
