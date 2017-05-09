import React, { PropTypes } from 'react'
import OrderTable from 'components/OrderTable/OrderTable'
import { Address } from 'pages/checkout/confirmation'


import {order} from '../../../fake'
const ord = order()

class OrderShow extends React.Component {
  render () {

    return (
      <main>
        <h2 className="green-h">Status: Pago</h2>
        <h4 className="sub-h">Referencia #{ord.id}</h4>
        <div className="flex-wrapper">
          <div className="big">
            <OrderTable editable={false} size="sm"/>
          </div>


          <div className="small">
            <Address {...ord.shippedTo} title="Dirección de Envío"/>
            <Address {...ord.invoiceTo} title="Facturacion"/>
          </div>
        </div>
      </main>
    )
  }
}

export default OrderShow;
