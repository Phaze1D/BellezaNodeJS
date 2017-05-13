import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import AddressForm from 'components/AddressForm/AddressForm'
import AddressList from 'components/AddressList/AddressList'

import {user, order} from '../../../fake'
const ord = order()
const usr = user()

export default class CheckoutDirections extends React.Component {
  constructor(props){
    super(props)

    this.handleFactura = this.handleFactura.bind(this)
  }

  handleFactura(event){
    this.refs.facturaBox.classList.toggle('hide-f')
  }

  render () {

    const detailList = ord.details.map( (detail, index) =>
      <DetailItem key={index} {...detail} />
    )

    return (
      <main>
        <h2>Información del Contacto</h2>
        <div className="grid-wrap around">
          <section className="col-9 col-md-8 col-sm-7 col-xs-12 last-xs">
            <article className="box">
              <h4 className="h-underline">Dirección de Envio</h4>

              <AddressList selectable={true}/>

              <h5 className="h-underline">Instrucciones de envío (Opcional)</h5>

              <textarea rows="6"></textarea>
            </article>

            <article className="box hide-f" ref="facturaBox">
              <h4 className="h-underline">
                Datos de Facturación
                <label className="sub-text" style={{float: 'right'}}>
                  <span className="col-xxs-hide">
                    Quieres factura
                  </span>

                  <input type="checkbox" onChange={this.handleFactura}/>
                </label>
              </h4>

              <AddressList selectable={true}/>

              <form className="main-form">
                <label htmlFor="name">Nombre</label>
                <input name="name" type="text"/>
                <label htmlFor="rfc">RFC</label>
                <input name="rfc" type="text"/>
              </form>

            </article>

            <Link to="/confirmation" className="submit full">Continuar</Link>
          </section>

          <section className="col-3 col-md-4 col-sm-5 col-xs-12 first-xs col-xxs-hide">
            <article className="box">
              <ul className="grid-wrap">
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
  <li className="grid center col-12 col-xs-6">
    <img className="col-4" src={props.pimg}/>
    <div className="col-8">
      <p className="sub-text primary">{props.description}</p>
      <p className="sub-text">
        Cantidad: {props.quantity} <br/>
        Subtotal: ${props.subtotal}
      </p>
    </div>
  </li>
)
