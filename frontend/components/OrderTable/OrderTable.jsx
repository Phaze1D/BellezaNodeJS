import React, { PropTypes } from 'react'
import classnames from 'classnames'


class OrderTable extends React.Component {
  constructor(props){
    super(props)

  }

  handleInputChange(index, event) {
    this.props.onRequestInputChange(index, Number(event.target.value))
  }

  handleRemove(index, event){
    this.props.onRequestRemove(index)
  }

  render () {
    const {
      order,
      editable
    } = this.props

    const detList = order.get('details').map( (detail, index) =>
      <OrderRow
        key={index}
        detail={detail}
        editable={editable}
        onRequestChange={this.handleInputChange.bind(this, index)}
        onRequestRemove={this.handleRemove.bind(this, index)}/>
    )

    return (
      <table className='order-table'>
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
            <td className="foot-main">${order.get('subTotal').toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5">IVA:</td>
            <td className="foot-main">${order.get('ivaTotal').toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5">Discount:</td>
            <td className="foot-main">${order.get('discountTotal').toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5">Costo de Envío: </td>
            <td className="foot-main">${order.get('shippingTotal').toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5">Total:</td>
            <td className="foot-main">${order.get('total').toFixed(2)}</td>
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
      <img src={props.details.get('pimg')}/>
    </td>

    <td className="xs-td" colSpan="4">
      <span className="xs-span">
        {props.details.get('name')}
      </span>

      <span className="xs-span">
        <span className="sub-text">Precio: </span>${props.details.get('price')}
      </span>

      <span className="xs-span">
        {props.editable ?
          <input type="number" max="10" min="0" value={props.details.get('quantity')} onChange={props.onRequestChange}/>
          :
          props.details.get('quantity')
        }
      </span>

      <span className="xs-span">
        <span className="sub-text">Subtotal: </span>${props.details.get('subTotal')}
      </span>
    </td>


    <td className="sm-td">
      {props.details.get('name')}
    </td>

    <td className="sm-td">
      ${props.details.get('price')}
    </td>

    <td className="sm-td">
      {props.editable ?
        <input type="number" max="10" min="0" value={props.details.get('quantity')} onChange={props.onRequestChange}/>
        :
        props.details.get('quantity')
      }
    </td>

    <td className="sm-td">
      ${props.details.get('subTotal')}
    </td>

    <td>
      {props.editable &&
        <i className="material-icons" onClick={props.onRequestRemove}>clear</i>
      }
    </td>
  </tr>
)
