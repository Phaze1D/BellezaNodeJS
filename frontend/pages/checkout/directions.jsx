import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AddressForm from 'components/AddressForm/AddressForm'
import AddressList from 'components/AddressList/AddressList'
import { addCartAddress, addCartExtra } from 'actions/cart'
import { CART_SHIPPING_ADDRESS, CART_INVOICE_ADDRESS } from 'actions/types'




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
    user: store.user,
    errors: store.errors
  }
})
export default class CheckoutDirections extends React.Component {
  constructor(props){
    super(props)

    this.handleFactura = this.handleFactura.bind(this)
    this.handleContinue = this.handleContinue.bind(this)
  }

  handleFactura(event) {
    this.refs.facturaBox.classList.toggle('hide-f')
    if(this.refs.facturaBox.classList.contains('hide-f')){
      this.props.dispatch(addCartAddress({}, CART_INVOICE_ADDRESS))
    }
  }

  handleContinue(event) {
    let extraData = new FormData()
    extraData.append('note', this.refs.noteInput.value)
    if(!this.refs.facturaBox.classList.contains('hide-f')){
      extraData.append('rfc', this.refs.rfcInput.value)
    }
    this.props.dispatch(addCartExtra(extraData))
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

    return (
      <main>
        <h2>Información del Contacto</h2>
        <div className="grid-wrap around">
          <section className="col-9 col-md-8 col-sm-7 col-xs-12 last-xs">
            <article className="box">
              <h4 className="h-underline">Dirección de Envio</h4>

              <AddressList
                selectable={true}
                selectActionType={CART_SHIPPING_ADDRESS}
                addresses={user.get('addresses')}
                errors={errors}
                dispatch={dispatch}/>

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
                selectActionType={CART_INVOICE_ADDRESS}
                addresses={user.get('addresses')}
                errors={errors}
                dispatch={dispatch}/>

              <form className="main-form" onSubmit={event => event.preventDefault()}>
                <label htmlFor="rfc">RFC</label>
                <input name="rfc" type="text" ref="rfcInput"/>
              </form>
            </article>

            <Link to="/confirmation"
              className="submit full"
              onClick={this.handleContinue}>
              Continuar
            </Link>
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
    <img className="col-4" src={props.detail.get('pimg')}/>
    <div className="col-8">
      <p className="sub-text primary">{props.detail.get('name')}</p>
      <p className="sub-text">
        Cantidad: {props.detail.get('quantity')} <br/>
        Subtotal: ${props.detail.get('subTotal')}
      </p>
    </div>
  </li>
)
