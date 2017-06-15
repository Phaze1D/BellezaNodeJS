import React, { PropTypes } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import AddressForm from 'components/AddressForm/AddressForm'
import AddressList from 'components/AddressList/AddressList'
import { addCartAddress, addCartExtra } from 'actions/cart'
import { resetErrors, setError } from 'actions/errors'





/**
* LOCAL - GET
* @param {object} user - The current logged in user
*
* LOCAL - GET
* @param {object} cartOrder - The cart order
*/

@connect( store => {
  return {
    cart: store.cart,
    errors: store.errors
  }
})
export default class CheckoutDirections extends React.Component {
  constructor(props){
    super(props)

    this.handleFactura = this.handleFactura.bind(this)
    this.handleContinue = this.handleContinue.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(addCartAddress({}, 'invoiceAddress'))
    this.props.dispatch(addCartAddress({}, 'shippingAddress'))
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors())
  }

  handleFactura(event) {
    this.refs.facturaBox.classList.toggle('hide-f')
    if(this.refs.facturaBox.classList.contains('hide-f')){
      this.props.dispatch(addCartAddress({}, 'invoiceAddress'))
      this.props.dispatch(resetErrors('invoiceAddress'))
    }
  }

  handleContinue(event) {
    let rfc = this.refs.rfcInput.value
    let razon_social = this.refs.razonInput.value
    let extraData = {}
    extraData.notes = this.refs.noteInput.value
    if(!this.refs.facturaBox.classList.contains('hide-f')){

      if(this.props.cart.get('invoiceAddress').isEmpty()) {
        event.preventDefault()
        this.props.dispatch(setError('invoiceAddress', 'Porfavor seleccione una dirección de facturación'))
      }

      if(!rfc) {
        event.preventDefault()
        this.props.dispatch(setError('rfc', 'RFC es Necesario'))
      }

      if(!razon_social){
        event.preventDefault()
        this.props.dispatch(setError('razon_social', 'Razon Social es Necesario'))
      }

      extraData.rfc = rfc
      extraData.razon_social = razon_social
    }

    if(this.props.cart.get('shippingAddress').isEmpty()){
      event.preventDefault()
      this.props.dispatch(setError('shippingAddress', 'Porfavor seleccione una dirección de envío'))
    }

    this.props.dispatch(addCartExtra(extraData))

  }

  handleError(message){

  }

  render () {
    const {
      cart,
      user,
      errors,
      dispatch
    } = this.props

    const detailList = cart.get('details').map( (detail, index) =>
      <DetailItem key={index} detail={detail}/>
    )

    if(!user.get('token')){
      return <Redirect to='/signin?redirect=checkout'/>
    }

    return (
      <main>
        <h2>Información del Contacto</h2>
        <div className="grid-wrap around">
          <section className="col-9 col-md-8 col-sm-7 col-xs-12 last-xs">
            <article className="box">
              <h4 className="h-underline">Dirección de Envio</h4>

              <AddressList
                selectable={true}
                selectActionType={'shippingAddress'}
                addresses={user.get('addresses')}
                errors={errors}
                dispatch={dispatch}
                userId={user.get('id')}
                token={user.get('token')}/>

              <h5 className="h-underline">Instrucciones de envío (Opcional)</h5>

              <textarea rows="6" ref="noteInput"></textarea>
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

              <AddressList
                selectable={true}
                selectActionType={'invoiceAddress'}
                addresses={user.get('addresses')}
                errors={errors}
                dispatch={dispatch}
                userId={user.get('id')}
                token={user.get('token')}/>

              <form className="main-form" onSubmit={event => event.preventDefault()}>
                <label htmlFor="rfc">RFC</label>
                {errors.get('rfc') && <div className="error-div">{errors.get('rfc')}</div>}
                <input name="rfc" type="text" ref="rfcInput"
                  onFocus={(event) => this.props.dispatch(resetErrors('rfc'))}/>

                <label htmlFor="razon_social">Razon Social</label>
                {errors.get('razon_social') && <div className="error-div">{errors.get('razon_social')}</div>}
                <input name="razon_social" type="text" ref="razonInput"
                  onFocus={(event) => this.props.dispatch(resetErrors('razon_social'))}/>
              </form>
            </article>

            <Link to="/confirmation"
              className="submit full"
              onClick={this.handleContinue}>
              Continuar
            </Link>
            {errors.get('shippingAddress') && <div className="error-div">{errors.get('shippingAddress')}</div>}
            {errors.get('invoiceAddress') && <div className="error-div">{errors.get('invoiceAddress')}</div>}
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
    <img className="col-4" src={`https://s3-us-west-1.amazonaws.com/belleza-node/products/xxs/${props.detail.get('plu')}.jpg`}/>
    <div className="col-8">
      <p className="sub-text primary">{props.detail.get('name')}</p>
      <p className="sub-text">
        Cantidad: {props.detail.get('quantity')} <br/>
        Subtotal: ${(props.detail.get('sub_total')/100).toFixed(2)}
      </p>
    </div>
  </li>
)
