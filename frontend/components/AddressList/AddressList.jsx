import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import AddressForm from 'components/AddressForm/AddressForm'
import classnames from 'classnames'

import {user} from '../../../fake.js'
const addresses = user().addresses

export default class AddressList extends React.Component {
  constructor(props){
    super(props)

    this.state = {showForm: false}

    this.handleCancel = this.handleCancel.bind(this)
    this.handleOverlayClick = this.handleOverlayClick.bind(this)
    this.handleAddressSelect = this.handleAddressSelect.bind(this)
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

  handleAddressSelect(event){
    if(this.props.selectable){
      let prev = this.refs.grid.getElementsByClassName('address__selected')[0]
      if( prev ){
        prev.classList.remove('address__selected')
      }
      event.currentTarget.classList.add('address__selected')
    }
  }

  render () {
    const selClass = classnames('address__item overflow-text', {'address__selectable': this.props.selectable})

    const addrList = addresses.map( (addr, index) =>
      <Address
        className={selClass}
        key={index} {...addr}
        onRequestEdit={this.handleShow.bind(this, addr)}
        onRequestSelect={this.handleAddressSelect}/>
    )


    return (
      <div>
        { addresses.length == 0 &&
          <p className="empty-p">Usted no tiene ninguna dirección registrada</p>
        }

        <div className="flex-grid" ref='grid'>
          {addrList}

          {this.state.showForm &&
            <div
              className="overlay"
              onClick={this.handleOverlayClick}
              onMouseEnter={(event) => document.body.style.overflow = "hidden"}
              onMouseLeave={(event) => document.body.style.overflow = ""}>

              <AddressForm onRequestCancel={this.handleCancel} {...this.address}/>
            </div>
          }
        </div>

        <button className="address__add" onClick={this.handleShow.bind(this, {})}>Nueva Dirección</button>
      </div>

    )
  }
}


export const Address = props => (
  <div className={props.className} onClick={props.onRequestSelect}>
    <p className="overflow-text">
      {props.firstName} {props.lastName}
    </p>

    <p className="overflow-text">{props.telephone}</p>

    <p className="divider"></p>

    <p className="overflow-text">{props.street1}</p>

    <p className="overflow-text">{props.street2}</p>

    <p className="overflow-text">
      {props.city}, {props.state}
    </p>
    <p className="overflow-text">{props.zipcode}</p>
    <p className="overflow-text">{props.country}</p>

    <ul>
      <li><Link to="#" onClick={props.onRequestEdit}>Editar</Link></li>
      <li><Link to="#">Borrar</Link></li>
    </ul>
  </div>
)
