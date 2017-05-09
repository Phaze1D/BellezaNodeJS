import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import OrderTable from 'components/OrderTable/OrderTable'

import {order} from '../../../fake'
const ord = order()

export default class CheckoutConfirmation extends React.Component {
  constructor(props){
    super(props)

    this.handleRadio = this.handleRadio.bind(this)
  }

  handleRadio(event){
    this.refs.boxCard.classList.toggle('hide-pay')
    this.refs.boxCash.classList.toggle('hide-pay')
  }

  render () {

    return (
      <main>
        <h2>Confirmar Orden</h2>
        <div className="flex-wrapper">
          <section className="big">
            <Link to="#" className="left-link">Editar</Link>
            <OrderTable editable={false} size="sm"/>

            <form className="green-form flex-form">
              <div className="input-div">
                <label htmlFor="code">Codigo De Descuento</label>
                <input name="code" type="text" className="input"/>
              </div>

              <input type="submit" value="Aplicar" className="submit"/>
            </form>

            <h2>Forma de Pago</h2>

            <radioGroup>
              <div className="box" ref="boxCard">
                <div className="payment_header">
                  Tarjeta de Crédito
        					<img src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/visa.png"/>
        					<img src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/americanexpress.png"/>
        					<img src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/mastercard.png"/>
        					<input className="checkbox-pay" name="active" type="radio" defaultChecked={true} onChange={this.handleRadio}/>
                </div>

                <form className="payment-form">
                  <div>
                    <label htmlFor="card-holder">Nombre: </label>
                    <input name="card-holder" type="text" className="input"/>
                  </div>
                  <div>
                    <label htmlFor="card-number">Numero de Tarjeta: </label>
                    <input name="card-number" type="text" className="input"/>
                  </div>

                  <div>
                    <label htmlFor="card-date">Fecha de Caducidad: </label>
                    <select>
                      <option>Mes</option>
                    </select>

                    <select>
                      <option>Año</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="card-secret">Codigo de Seguridad: </label>
                    <input name="card-secret" type="text" className="input sm"/>
                  </div>

                  <input type="submit" value="Pagar" className="submit"/>

                </form>

              </div>

              <div className="box hide-pay" ref="boxCash">
                <div className="payment_header">
                  Pagar en Efectivo
        					<img src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/oxxo.png"/>
                  <img src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/bank.png"/>
        					<input className="checkbox-pay" name="active" type="radio" defaultChecked={false} onChange={this.handleRadio}/>
                </div>

                <form className="payment-form">
                  <div>
                    <label htmlFor="card-date">Tipo: </label>
                    <select>
                      <option>OXXO</option>
                    </select>
                  </div>

                  <input type="submit" value="Pagar" className="submit"/>

                </form>

              </div>

            </radioGroup>

          </section>

          <section className="small">
            <Address {...ord.shippedTo} title="Dirección de Envío"/>
            <Address {...ord.invoiceTo} title="Facturacion"/>

          </section>
        </div>
      </main>
    )
  }
}


export const Address = props => (
  <div className="address-box">
    <h5>{props.title}</h5>
    <p className="divider"></p>

    <p className="overflow-text">
      {props.firstName} {props.lastName}
    </p>

    <p className="overflow-text">{props.telephone}</p>

    <p className="overflow-text">{props.street1}</p>

    <p className="overflow-text">{props.street2}</p>

    <p className="overflow-text">
      {props.city}, {props.state}
    </p>
    <p className="overflow-text">{props.zipcode}</p>
    <p className="overflow-text">{props.country}</p>
  </div>
)
