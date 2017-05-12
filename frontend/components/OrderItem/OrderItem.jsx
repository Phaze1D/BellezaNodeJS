import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

const OrderItem = (props) => {
  const detailList = props.details.map( (detail, index) =>
    <Detail key={index} {...detail} />
  )

  return (
    <article className="box">
      <div className="grid order-item-top">
        <p>
          Fecha Realizado
          <span>{props.date.format('MMM DD, YYYY')}</span>
        </p>

        <p>
          Total
          <span>${props.total}</span>
        </p>

        <p>
          Status
          <span style={{color: '#1eab30'}}>Enviado</span>
        </p>

        <p>
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
      <p style={{fontWeight: 'bold', color: 'black'}}>{props.description}</p>
      <p className="sub-text">Precio: ${props.price} Cantidad: {props.quantity}</p>
      <p className="sub-text primary">${props.subtotal}</p>
    </div>

    <Link to="/product" className="secondary-button raise">Comparar de Nuevo</Link>
  </div>
)


export default OrderItem
