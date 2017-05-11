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
        <div className="grid top between">
          <section className="col-8">
            <Link to="/cart" style={{float: 'right'}}>Editar</Link>
            <OrderTable editable={false} size="sm"/>

            <form className="main-form grid bottom">
              <div className="col-8">
                <label htmlFor="code">Codigo De Descuento</label>
                <input name="code" type="text" className="input"/>
              </div>

              <div className="col-4">
                <input type="submit" value="Aplicar" className="submit full"/>
              </div>
            </form>

            <h2>Forma de Pago</h2>

            <radioGroup>
              <div className="box" ref="boxCard">
                <div className="grid center">
                  Tarjeta de Crédito:
        					<img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/visa.png"/>
        					<img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/americanexpress.png"/>
        					<img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/mastercard.png"/>
        					<input
                    style={{marginLeft: 'auto'}}
                    name="active" type="radio"
                    defaultChecked={true}
                    onChange={this.handleRadio}/>
                </div>

                <form className="payment-form">
                  <div className="grid center">
                    <label className="col-4" htmlFor="card-holder">Nombre: </label>
                    <input className="col-8" name="card-holder" type="text"/>
                  </div>

                  <div className="grid center">
                    <label className="col-4" htmlFor="card-number">Numero de Tarjeta: </label>
                    <input className="col-8" name="card-number" type="text"/>
                  </div>

                  <div className="grid center">
                    <label className="col-4" htmlFor="card-date">Fecha de Caducidad: </label>
                    <select>
                      <option>Mes</option>
                    </select>

                    <select>
                      <option>Año</option>
                    </select>
                  </div>

                  <div className="grid center">
                    <label className="col-4" htmlFor="card-secret">Codigo de Seguridad: </label>
                    <input className="col-3" name="card-secret" type="text"/>
                  </div>

                  <input type="submit" value="Pagar" className="submit full"/>
                </form>

              </div>

              <div className="box hide-pay" ref="boxCash">
                <div className="grid center">
                  Pagar en Efectivo
        					<img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/oxxo.png"/>
                  <img className="card-img" src="https://s3-us-west-1.amazonaws.com/belleza-organica-images/images/web/bank.png"/>
        					<input
                    style={{marginLeft: 'auto'}}
                    name="active" type="radio"
                    defaultChecked={false}
                    onChange={this.handleRadio}/>
                </div>

                <form className="payment-form">
                  <div className="grid center">
                    <label className="col-4" htmlFor="card-date">Tipo: </label>
                    <select>
                      <option>OXXO</option>
                    </select>
                  </div>

                  <input type="submit" value="Pagar" className="submit full"/>

                </form>

              </div>

            </radioGroup>

          </section>

          <section className="col-4">
            <Address {...ord.shippedTo} title="Dirección de Envío"/>
            <Address {...ord.invoiceTo} title="Facturacion"/>

          </section>
        </div>
      </main>
    )
  }
}


export const Address = props => (
  <div className="box overflow-text sub-text">
    <p>{props.title}</p>
    <hr></hr>
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
