import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import AddressForm from 'components/AddressForm/AddressForm'
import AddressList from 'components/AddressList/AddressList'

import { order, user } from '../../../fake.js'
const ord = order();
const usr = user();

export default class CheckoutDirections extends React.Component {
  constructor(props){
    super(props)

    this.handleFactura = this.handleFactura.bind(this)
  }

  handleFactura(event){
    this.refs.facturaBox.classList.toggle('hide')
  }

  render () {

    const detailList = ord.details.map( (detail, index) =>
      <DetailItem key={index} {...detail} />
    )

    return (
      <main>
        <h2>Información del Contacto</h2>
        <div className="flex-wrapper">
          <section className="big">
            <article className="box">
              <h4 className="h-underline">Dirección de Envio</h4>

              <AddressList selectable={true}/>

              <h5 className="h-underline">Instrucciones de envío (Opcional)</h5>

              <textarea rows="8"></textarea>
            </article>

            <article className="box hide" ref="facturaBox">
              <h4 className="h-underline factura-title">
                Datos de Facturación
                <label>
                  Quieres factura
                  <input type="checkbox" onChange={this.handleFactura}/>
                </label>
              </h4>

              <AddressList selectable={true}/>

              <form className="green-form">
                <label htmlFor="name">Nombre</label>
                <input name="name" type="text" className="input"/>
                <label htmlFor="rfc">RFC</label>
                <input name="rfc" type="text" className="input"/>
              </form>

            </article>

            <Link to="/confirmation" className="button light">Continuar</Link>
          </section>

          <section className="small">
            <article className="box">
              <ul className="checkout-list">
                {detailList}
              </ul>
            </article>
          </section>

        </div>
      </main>
    )
  }
}



const DetailItem = props => (
  <li>
    <img src={props.pimg}/>
    <div>
      <h4>{props.description}</h4>
      <p>
        Cantidad: {props.quantity} <br/>
        Subtotal: ${props.subtotal}
      </p>
    </div>
  </li>
)
