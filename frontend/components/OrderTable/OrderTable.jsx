import React, { PropTypes } from 'react'
import classnames from 'classnames'

const ord = {details:[]}

class OrderTable extends React.Component {
  constructor(props){
    super(props)

  }

  handleInputChange(index, event) {
    this.props.onRequestChange(index, event)
  }

  render () {
    const tableClasses = classnames('order-table', this.props.size)

    const detList = ord.details.map( (detail, index) =>
      <OrderRow
        key={index} {...detail}
        editable={this.props.editable}
        onRequestChange={this.handleInputChange.bind(this, index)}/>
    )

    return (
      <table className={tableClasses}>
        <thead>
          <tr className="col-xs-hide">
            <th>Producto</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th className="overflow-text">Subtotal <span className="sub-text">Sin IVA</span></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {detList}
        </tbody>

        <tfoot className="order-table-foot">
          <tr>
            <td colSpan="5">Subtotal: </td>
            <td className="foot-main">${ord.subtotal}</td>
          </tr>
          <tr>
            <td colSpan="5">IVA:</td>
            <td className="foot-main">${ord.iva}</td>
          </tr>
          <tr>
            <td colSpan="5">Discount:</td>
            <td className="foot-main">${ord.discount}</td>
          </tr>
          <tr>
            <td colSpan="5">Costo de Envío: </td>
            <td className="foot-main">${ord.shippingCost}</td>
          </tr>
          <tr>
            <td colSpan="5">Total:</td>
            <td className="foot-main">${ord.total}</td>
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

    <td className="xs-td" colSpan="4">
      <span className="xs-span">
        {props.description}
      </span>

      <span className="xs-span">
        <span className="sub-text">Precio: </span>${props.price}
      </span>

      <span className="xs-span">
        {props.editable ?
          <input type="number" max="10" min="0" value={props.quantity} onChange={props.onRequestChange}/>
          :
          props.quantity
        }
      </span>

      <span className="xs-span">
        <span className="sub-text">Subtotal: </span>${props.subtotal}
      </span>
    </td>


    <td className="sm-td">
      {props.description}
    </td>

    <td className="sm-td">
      ${props.price}
    </td>

    <td className="sm-td">
      {props.editable ?
        <input type="number" max="10" min="0" value={props.quantity} onChange={props.onRequestChange}/>
        :
        props.quantity
      }
    </td>

    <td className="sm-td">
      ${props.subtotal}
    </td>



      <td>
        {props.editable &&
        <i className="material-icons">clear</i>
        }
      </td>
  </tr>
)
