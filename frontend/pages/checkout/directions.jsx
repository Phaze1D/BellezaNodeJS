import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import AddressForm from 'components/AddressForm/AddressForm'
import AddressList from 'components/AddressList/AddressList'


const ord = {details: []}
const usr = {}

export default class CheckoutDirections extends React.Component {
  constructor(props){
    super(props)

    this.handleFactura = this.handleFactura.bind(this)
  }

  handleFactura(event){
    if(this.refs.facturaBox.style.height === "84px"){
      this.refs.facturaBox.style.height = ""
    }else {
      this.refs.facturaBox.style.height = "84px"
    }

  }

  render () {

    const detailList = ord.details.map( (detail, index) =>
      <DetailItem key={index} {...detail} />
    )

    return (
      <main>
        <h2>Información del Contacto</h2>
        <div className="grid">
          <section className="col-9">
            <article className="box">
              <h4 className="h-underline">Dirección de Envio</h4>

              <AddressList selectable={true}/>

              <h5 className="h-underline">Instrucciones de envío (Opcional)</h5>

              <textarea rows="6"></textarea>
            </article>

            <article className="box" style={{height: '84px'}} ref="facturaBox">
              <h4 className="h-underline">
                Datos de Facturación
                <label className="sub-text" style={{float: 'right'}}>
                  Quieres factura
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

          <section className="col-3">
            <article className="box">
              <ul>
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
  <li className="grid center">
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
