import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import AddressForm from 'components/AddressForm/AddressForm'

import {user} from '../../../fake.js'

const us = user()

class UserAddresses extends React.Component {
  constructor(props){
    super(props)
    this.state = {showForm: false}

    this.handleCancel = this.handleCancel.bind(this)
    this.handleOverlayClick = this.handleOverlayClick.bind(this)
  }

  handleShow(address, event) {
    event.preventDefault()
    this.address = address
    this.setState({showForm: true})
  }

  handleCancel(event) {
    this.setState({showForm: false})
    document.body.style.overflow = ""
  }

  handleOverlayClick(event){
    if(event.target.classList.contains('overlay')){
      this.setState({showForm: false})
      document.body.style.overflow = ""
    }
  }

  render () {
    const addreList = us.addresses.map( (address , index) =>
      <Address key={index} {...address} onRequestEdit={this.handleShow.bind(this, address)}/>
    )

    return (
      <section className="user__section smooth">
        <h2>
          Mi Directorio
          <Link to="#">Salir</Link>
        </h2>

        <div className="addresses__wrapper">
          {addreList}
        </div>

        <button className="address__add" onClick={this.handleShow.bind(this, {})}>Agregar</button>

        {this.state.showForm &&
          <div
            className="overlay"
            onClick={this.handleOverlayClick}
            onMouseEnter={(event) => document.body.style.overflow = "hidden"}
            onMouseLeave={(event) => document.body.style.overflow = ""}>

            <AddressForm onRequestCancel={this.handleCancel} {...this.address}/>
          </div>
        }

      </section>
    )
  }
}

export default UserAddresses;


const Address = props => (
  <div className="address__item">
    <p>
      {props.firstName} {props.lastName}
    </p>

    <p>{props.telephone}</p>

    <p className="divider"></p>

    <p>{props.street1}</p>

    <p>{props.street2}</p>

    <p>
      {props.city}, {props.state}
    </p>
    <p>{props.zipcode}</p>
    <p>{props.country}</p>

    <ul>
      <li><Link to="#" onClick={props.onRequestEdit}>Editar</Link></li>
      <li><Link to="#">Borrar</Link></li>
    </ul>
  </div>
)
