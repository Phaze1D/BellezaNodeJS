import React, { PropTypes } from 'react'

import {order} from '../../../fake.js'
const ords = order()

class OrderTable extends React.Component {
  constructor(props){
    super(props)

  }

  handleInputChange(index, event) {
    this.props.onRequestChange(index, event)
  }

  render () {

    const detList = ords.details.map( (detail, index) =>
      <OrderRow
        key={index} {...detail}
        onRequestChange={this.handleInputChange.bind(this, index)}/>
    )

    return (
      <table className="order__table smooth">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal <span>Sin IVA</span></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {detList}
        </tbody>

        <tfoot className="order__table-foot">
          <tr>
            <td colSpan="5">Subtotal: </td>
            <td className="foot-main">${ords.subtotal}</td>
          </tr>
          <tr>
            <td colSpan="5">IVA:</td>
            <td className="foot-main">${ords.iva}</td>
          </tr>
          <tr>
            <td colSpan="5">Discount:</td>
            <td className="foot-main">${ords.discount}</td>
          </tr>
          <tr>
            <td colSpan="5">Costo de Envío: </td>
            <td className="foot-main">${ords.shippingCost}</td>
          </tr>
          <tr>
            <td colSpan="5">Total:</td>
            <td className="foot-main">${ords.total}</td>
          </tr>

        </tfoot>

      </table>
    )
  }
}

export default OrderTable;


const OrderRow = (props) => (
  <tr>
    <td>
      <img src={props.pimg}/>
    </td>

    <td>
      {props.description}
    </td>

    <td>
      ${props.price}
    </td>

    <td>
      <input className="input input-quantity" type="number" max="10" min="0" value={props.quantity} onChange={props.onRequestChange}/>
    </td>

    <td>
      ${props.subtotal}
    </td>

    <td>
      <a href="#">Eliminar</a>
    </td>
  </tr>
)
