import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import dateOptions from 'utils/date'

const OrderItem = (props) => {
  const detailList = props.details.map( (detail, index) =>
    <Detail key={index} {...detail} />
  )

  return (
    <article className="box">
      <div className="grid order-item-top">
        <p className="overflow-text">
          Fecha Realizado
          <span>{props.date.toLocaleString('en-us', dateOptions)}</span>
        </p>

        <p className="overflow-text">
          Total
          <span>${props.total}</span>
        </p>

        <p className="overflow-text">
          Status
          <span style={{color: '#1eab30'}}>Enviado</span>
        </p>

        <p className="overflow-text">
          Referencia #{props.id}
          <span>
            <Link to="/order">Detalles</Link>
          </span>
        </p>
      </div>

      {detailList}
    </article>
  )
}


const Detail = props => (
  <div className="grid center">
    <img src={props.pimg} className="col-2"/>
    <div className="grow">
      <p style={{fontWeight: 'bold', color: 'black'}} className="overflow-text">{props.description}</p>
      <p className="sub-text overflow-text">Precio: ${props.price} Cantidad: {props.quantity}</p>
      <p className="sub-text primary">${props.subtotal}</p>
    </div>

    <Link to="/product" className="secondary-button raise">
      <span className="col-sm-hide">Comparar de Nuevo</span>
      <span className="col-hide col-sm-show">Comparar</span>
    </Link>
  </div>
)


export default OrderItem
