import React, { PropTypes } from 'react'
import classnames from 'classnames'


class OrderTable extends React.Component {
  constructor(props){
    super(props)

  }

  handleInputChange(index, stock, event) {
    let quantity = Number(event.target.value)
    if(quantity <= stock){
      this.props.onRequestInputChange(index, quantity)
    }else{
      let pur = stock > 1 ? 'disponibles' : 'disponible'
      this.props.onRequestError(`Sólo ${stock} ${pur}`)
    }
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
        onRequestChange={this.handleInputChange.bind(this, index, detail.get('stock'))}
        onRequestRemove={this.handleRemove.bind(this, index)}/>
    )

    return (
      <table className='order-table'>
        <thead>
          <tr className="col-xs-hide">
            <th>Producto</th>
            <th>Descripción</th>
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
            <td className="foot-main">${(order.get('sub_total')/100).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5">IVA:</td>
            <td className="foot-main">${(order.get('iva_total')/100).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5">Costo de Envío: </td>
            <td className="foot-main">${(order.get('shipping_total')/100).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5">Discount:</td>
            <td className="foot-main">-${(order.get('discount_total')/100 ).toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="5">Total:</td>
            <td className="foot-main">${(order.get('total')/100).toFixed(2)}</td>
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
      <picture>
        <source
          srcSet={`https://s3-us-west-1.amazonaws.com/belleza-node/products/xs/${props.detail.get('plu')}.jpg`}
          media="(max-width: 712px)"/>
        <img src={`https://s3-us-west-1.amazonaws.com/belleza-node/products/sm/${props.detail.get('plu')}.jpg`}/>
      </picture>
    </td>

    <td className="xs-td" colSpan="4">
      <span className="xs-span">
        {props.detail.get('name')}
      </span>

      <span className="xs-span">
        <span className="sub-text">Precio: </span>${(props.detail.get('price')/100).toFixed(2)}
      </span>

      <span className="xs-span">
        {props.editable ?
          <input type="number" max={props.detail.get('stock')} min="0" value={props.detail.get('quantity')} onChange={props.onRequestChange}/>
          :
          props.detail.get('quantity')
        }
      </span>

      <span className="xs-span">
        <span className="sub-text">Subtotal: </span>${(props.detail.get('sub_total')/100).toFixed(2)}
      </span>
    </td>


    <td className="sm-td">
      {props.detail.get('name')}
    </td>

    <td className="sm-td">
      ${(props.detail.get('price')/100).toFixed(2)}
    </td>

    <td className="sm-td">
      {props.editable ?
        <input type="number" max={props.detail.get('stock')} min="0" value={props.detail.get('quantity')} onChange={props.onRequestChange}/>
        :
        props.detail.get('quantity')
      }
    </td>

    <td className="sm-td">
      ${(props.detail.get('sub_total')/100).toFixed(2)}
    </td>

    <td>
      {props.editable &&
        <i className="material-icons" onClick={props.onRequestRemove}>clear</i>
      }
    </td>
  </tr>
)
