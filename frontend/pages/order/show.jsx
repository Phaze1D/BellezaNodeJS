import React, { PropTypes } from 'react'
import OrderTable from 'components/OrderTable/OrderTable'
import { Address } from 'pages/checkout/confirmation'


import {order} from '../../../fake'
const ord = order()

class OrderShow extends React.Component {
  render () {

    return (
      <main>
        <h2 style={{color: '#1eab30'}}>Status: Pago</h2>
        <h4 className="sub-text">Referencia #{ord.id}</h4>
        <div className="grid-wrap">
          <div className="col-9 col-md-8 col-sm-12">
            <OrderTable editable={false} size="sm"/>
          </div>


          <div className="col-3 col-md-4 col-sm-12">
            <Address {...ord.shippedTo} title="Dirección de Envío"/>
            <Address {...ord.invoiceTo} title="Facturacion"/>
          </div>
        </div>
      </main>
    )
  }
}

export default OrderShow;
