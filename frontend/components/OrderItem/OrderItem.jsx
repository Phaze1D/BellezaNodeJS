import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import dateOptions from 'utils/date'

class OrderItem extends React.PureComponent {
  render() {
    const {
      order
    } = this.props

    const detailList = order.get('details').map( (detail, index) =>
      <Detail key={index} detail={detail} />
    )

    return (
      <article className="box">
        <div className="grid order-item-top">
          <p className="overflow-text col-xxs-hide">
            Fecha Realizado
            <span>{order.get('date').toLocaleString('en-us', dateOptions)}</span>
          </p>

          <p className="overflow-text col-xxs-hide">
            Total
            <span>${order.get('total')}</span>
          </p>

          <p className="overflow-text">
            Status
            <span style={{color: '#1eab30'}}>order.get('status')</span>
          </p>

          <p className="overflow-text">
            Referencia #{order.get('id')}
            <span>
              <Link to="/order">Detalles</Link>
            </span>
          </p>
        </div>

        {detailList}
      </article>
    )
  }
}

class Detail extends React.PureComponent {
  render() {
    const {
      detail
    } = this.props

    return (
      <div className="grid-wrap center">
        <img src={detail.get('pimg')} className="col-2 col-xxs-3"/>
        <div className="grow col-xxs-9">
          <p style={{fontWeight: 'bold', color: 'black'}} className="overflow-text">{detail.get('name')}</p>
          <p className="sub-text overflow-text">Precio: ${detail.get('price')} Cantidad: {detail.get('quantity')}</p>
          <p className="sub-text primary">${detail.get('subTotal')}</p>
        </div>

        <Link to="/product" className="secondary-button raise col-xxs-hide">
          <span className="col-sm-hide">Comparar de Nuevo</span>
          <span className="col-hide col-sm-show">Comparar</span>
        </Link>
      </div>
    )
  }
}


export default OrderItem
