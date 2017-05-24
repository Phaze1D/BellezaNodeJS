import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import OrderTable from 'components/OrderTable/OrderTable'
import { checkUserCode } from 'actions/discountcode'
import { cashPayment, cardPayment } from 'actions/payment'

/**
* LOCAL - GET
* @param {object} user - The current logged in user
*
* LOCAL - GET
* @param {object} cartOrder - The current cart order
*
* HTTP - POST
* @param {string} discountCode - The discount code to check
*
* HTTP - POST
* @param {object} cardPayment - All the info to create a card payment including cartOrder
*
* HTTP - POST
* @param {object} cashPayment - All the info to create a cash payment including cartOrder
*/

@connect( store => {
  return {
    cart: store.cart,
    user: store.user,
    codes: store.codes,
    payment: store.payment,
    errors: store.errors
  }
})
export default class CheckoutConfirmation extends React.Component {
  constructor(props){
    super(props)

    this.handleRadio = this.handleRadio.bind(this)
    this.handleSubmitCode = this.handleSubmitCode.bind(this)
    this.handleSubmitCard = this.handleSubmitCard.bind(this)
    this.handleSubmitCash = this.handleSubmitCash.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  handleRadio(event){
    this.refs.boxCard.classList.toggle('hide-pay')
    this.refs.boxCash.classList.toggle('hide-pay')
  }

  handleSubmitCode(event){
    event.preventDefault()
    let formData = {}
    formData['code'] = event.target.elements.code.value
    let user = this.props.user

    this.props.dispatch(checkUserCode(formData, user.get('id') ,user.get('token')))
    .then()
    .catch(this.handleError)
  }

  handleSubmitCard(event){
    event.preventDefault()
    let elements = event.target.elements
    let formData = new FormData()
    formData.append('card-holder', elements['card-holder'].value)
    formData.append('card-number', elements['card-number'].value)
    formData.append('card-secret', elements['card-secret'].value)
    formData.append('card-month', elements['card-month'].value)
    formData.append('card-year', elements['card-year'].value)

    this.props.dispatch(cardPayment(formData))
    .then()
    .catch(this.handleError)
  }

  handleSubmitCash(event){
    event.preventDefault()
    let elements = event.target.elements
    let formData = new FormData()
    formData.append('type', elements['type'].value)

    this.props.dispatch(cashPayment(formData))
    .then()
    .catch(this.handleError)
  }

  handleError(response){

  }

  render () {
    const {
      cart,
      user,
      codes,
      payment,
      errors
    } = this.props

    if(!user.get('token')){
      return <Redirect to='/home'/>
    }

    return (
      <main>
        <h2>Confirmar Orden</h2>
        <div className="grid-wrap top between">
          <section className="col-8 col-sm-12 last-sm">
            <Link to="/cart" style={{float: 'right'}}>Editar</Link>
            <OrderTable
              order={cart}
              editable={false}/>

            <form className="main-form grid bottom" onSubmit={this.handleSubmitCode}>
              <div className="col-8">
                <label htmlFor="code">Codigo De Descuento</label>
                {errors.get('code') && <div className="error-div">{errors.get('code')}</div>}
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

                <form className="payment-form" onSubmit={this.handleSubmitCard}>
                  <div className="grid center">
                    <label className="col-4 col-md-5" htmlFor="card-holder">Nombre: </label>
                    <input className="col-8 col-md-7" name="card-holder" type="text"/>
                  </div>

                  <div className="grid center">
                    <label className="col-4 col-md-5" htmlFor="card-number">Numero de Tarjeta: </label>
                    <input className="col-8 col-md-7" name="card-number" type="text"/>
                  </div>

                  <div className="grid center">
                    <label className="col-4 col-md-5" htmlFor="card-date">Fecha de Caducidad: </label>
                    <select name="card-month">
                      <option value="" disabled selected>Mes</option>
                      <option value='01'>Enero (1)</option>
          						<option value='02'>Febrero (2)</option>
          						<option value='03'>Marzo (3)</option>
          						<option value='04'>Abril (4)</option>
          						<option value='05'>Mayo (5)</option>
          						<option value='06'>Junio (6)</option>
          						<option value='07'>Julio (7)</option>
          						<option value='08'>Agosto (8)</option>
          						<option value='09'>Septiembre (9)</option>
          						<option value='10'>Octubre (10)</option>
          						<option value='11'>Noviembre (11)</option>
          						<option value='12'>Diciembre (12)</option>
                    </select>

                    <select name="card-year">
                      <option value="" disabled selected>Año</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2019">2019</option>
                      <option value="2021">2019</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                      <option value="2032">2032</option>
                      <option value="2033">2033</option>
                      <option value="2034">2034</option>
                      <option value="2035">2035</option>
                    </select>
                  </div>

                  <div className="grid center">
                    <label className="col-4 col-md-5" htmlFor="card-secret">Codigo de Seguridad: </label>
                    <input className="col-3 col-md-7" name="card-secret" type="text"/>
                  </div>

                  <input type="submit" value="Pagar" className="submit full"/>
                  {errors.get('card') && <div className="error-div">{errors.get('card')}</div>}
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

                <form className="payment-form" onSubmit={this.handleSubmitCash}>
                  <div className="grid center">
                    <label className="col-4" htmlFor="card-date">Tipo: </label>
                    <select name="type">
                      <option value="oxxo">OXXO</option>
                      <option value="bank">Bank</option>
                    </select>
                  </div>

                  <input type="submit" value="Pagar" className="submit full"/>
                  {errors.get('cash') && <div className="error-div">{errors.get('cash')}</div>}
                </form>
              </div>
            </radioGroup>
          </section>

          <section className="col-4 col-sm-12 first-sm">
            <Address address={cart.get('shippingAddress')} title="Dirección de Envío"/>
            <Address address={cart.get('invoiceAddress')} title="Facturacion"/>
          </section>
        </div>
      </main>
    )
  }
}


export const Address = props => (
  <div className="box overflow-text sub-text">
    <p>{props.address.get('title')}</p>
    <hr></hr>
    <p className="overflow-text">
      {props.address.get('first_name')} {props.address.get('last_name')}
    </p>
    <p className="overflow-text">{props.address.get('telephone')}</p>
    <p className="overflow-text">{props.address.get('street')}</p>
    <p className="overflow-text">{props.address.get('street2')}</p>
    <p className="overflow-text">
      {props.address.get('city')}, {props.address.get('state')}
    </p>
    <p className="overflow-text">{props.address.get('zipcode')}</p>
    <p className="overflow-text">{props.address.get('country')}</p>
  </div>
)
