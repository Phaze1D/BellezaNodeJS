import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const OrderItem = (props) => {
  const detailList = props.details.map( (detail, index) =>
    <Detail key={index} {...detail} />
  )

  return (
    <article className="order-item__article">
      <div className="order-item__top smooth">
        <p>
          Fecha Realizado
          <span>{moment(props.date).format('MMM DD, YYYY')}</span>
        </p>

        <p>
          Total
          <span>${props.total}</span>
        </p>

        <p>
          Status
          <span className="clickable green">Enviado</span>
        </p>

        <p>
          Referencia #{props.id}
          <span className="clickable">
            <Link to="/order">Detalles</Link>
          </span>
        </p>
      </div>

      {detailList}
    </article>
  )
}


const Detail = props => (
  <div className="order-item__bottom smooth">
    <img src={props.pimg}/>
    <div>
      <h4>{props.description}</h4>
      <p>Precio: ${props.price} Cantidad: {props.quantity}</p>
      <p className="subtotal">${props.subtotal}</p>
    </div>

    <div className="more">
      <Link className="add-button" to="/product">Comparar de Nuevo</Link>
    </div>
  </div>
)


export default OrderItem
