import React, { PropTypes } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import OrderTable from 'components/OrderTable/OrderTable'
import { checkUserCode } from 'actions/discountcode'
import { resetErrors, setError } from 'actions/errors'
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
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleError = this.handleError.bind(this)

    this.successfullToken = this.successfullToken.bind(this)
    this.errorToken = this.errorToken.bind(this)

  }

  componentDidMount() {
    if(window.Conekta){
      window.Conekta.setPublicKey('key_AaqMzJxRutqdky7ECgp8jAw')
    }
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors())
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
    this.props.dispatch(resetErrors('card_token'))
    event.preventDefault()
    let elements = event.target.elements
    let data = {
      "card": {
        "number": elements.number.value,
        "name": elements.holder.value,
        "exp_year": elements.year.value,
        "exp_month": elements.month.value,
        "cvc": elements.secret.value
      }
    };
    elements.submit.disabled = true
    window.Conekta.Token.create(data, this.successfullToken, this.errorToken)

  }

  successfullToken(token){
    let formData = this.props.cart.toJS()
    formData.payment_source = {
      token: token,
      type: 'card'
    }
    this.props.dispatch(cardPayment(formData, this.props.user.get('token')))
    .then(this.handleSuccess)
    .catch(this.handleError)
  }

  errorToken(err){
    this.props.dispatch(setError('card_token', err.message_to_purchaser))
    document.getElementById('card-form').elements.submit.disabled = false
  }

  handleSubmitCash(event){
    event.preventDefault()
    let elements = event.target.elements
    elements.submit.disabled = true
    let formData = this.props.cart.toJS()
    formData.payment_source = {
      type: elements['payment_type'].value
    }

    this.props.dispatch(cashPayment(formData, this.props.user.get('token')))
    .then(this.handleSuccess)
    .catch(this.handleError)
  }

  handleSuccess(respones){
    document.getElementById('card-form').elements.submit.disabled = false
    this.props.history.push({
      pathname: '/successful',
    })
  }

  handleError(response){
    console.log(response);
    document.getElementById('card-form').elements.submit.disabled = false

  }

  render () {
    const {
      cart,
      user,
      errors
    } = this.props

    if(!user.get('token')){
      return <Redirect to='/home'/>
    }

    let years = []
    const curYear = (new Date()).getFullYear()
    for (var i = 0; i < 20; i++) {
      years.push(<option key={curYear + i} value={curYear + i}>{curYear + i}</option>)
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

            {cart.get('discount_code_id') ?
              <div className="success-box">Descuento Aplicado</div>
            :
              <form className="main-form grid bottom" onSubmit={this.handleSubmitCode}>
                <div className="col-8">
                  <label htmlFor="code">Codigo De Descuento</label>
                  {errors.get('code') && <div className="error-div">{errors.get('code')}</div>}
                  <input name="code" type="text" className="input"
                    onFocus={(event) => this.props.dispatch(resetErrors('code'))}/>
                </div>

                <div className="col-4">
                  <input type="submit" value="Aplicar" className="submit full"/>
                </div>
              </form>
            }

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

                <form id="card-form" className="payment-form" onSubmit={this.handleSubmitCard}>
                  <div className="grid center">
                    <label className="col-4 col-md-5" htmlFor="holder">Nombre: </label>
                    <input className="col-8 col-md-7" name="holder" type="text"/>
                  </div>

                  <div className="grid center">
                    <label className="col-4 col-md-5" htmlFor="number">Numero de Tarjeta: </label>
                    <input className="col-8 col-md-7" name="number" type="text"/>
                  </div>

                  <div className="grid center">
                    <label className="col-4 col-md-5" htmlFor="month">Fecha de Caducidad: </label>
                    <select name="month">
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

                    <select name="year">
                      {years}
                    </select>
                  </div>

                  <div className="grid center">
                    <label className="col-4 col-md-5" htmlFor="secret">Codigo de Seguridad: </label>
                    <input className="col-3 col-md-7" name="secret" type="text"/>
                  </div>

                  <input type="submit" value="Pagar" name="submit" className="submit full"/>
                  {errors.get('card_token') && <div className="error-div">{errors.get('card_token')}</div>}
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

                <form id="cash-form" className="payment-form" onSubmit={this.handleSubmitCash}>
                  <div className="grid center">
                    <label className="col-4" htmlFor="card-date">Tipo: </label>
                    <select name="payment_type">
                      <option value="oxxo_cash">OXXO</option>
                      <option value="spei">Transferencia Bancaria</option>
                    </select>
                  </div>

                  <input type="submit" value="Pagar" name="submit" className="submit full"/>
                  {errors.get('cash') && <div className="error-div">{errors.get('cash')}</div>}
                </form>

                <p className="sub-text" style={{fontStyle: 'italic'}}>Los pagos en efectivo no se pueden devolver</p>
              </div>
            </radioGroup>
          </section>

          <section className="col-4 col-sm-12 first-sm">
            <Address address={cart.get('shippingAddress')} title="Dirección de Envío"/>
            {!cart.get('invoiceAddress').isEmpty() &&
              <Address address={cart.get('invoiceAddress')} title="Facturacion" rfc={cart.get('rfc')} razonSocial={cart.get('razon_social')}/>
            }
          </section>
        </div>
      </main>
    )
  }
}


export const Address = props => (
  <div className="box overflow-text sub-text">
    <p>{props.title}</p>
    <p>{props.rfc}</p>
    <p>{props.razonSocial}</p>
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
