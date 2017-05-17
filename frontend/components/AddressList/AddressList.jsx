import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import AddressForm from 'components/AddressForm/AddressForm'
import classnames from 'classnames'
import { Map } from 'immutable'



export default class AddressList extends React.Component {
  constructor(props){
    super(props)

    this.state = {showForm: false}

    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOverlayClick = this.handleOverlayClick.bind(this)
    this.handleAddressSelect = this.handleAddressSelect.bind(this)
  }

  handleShow(address, event) {
    event.preventDefault()
    this.address = address
    this.setState({showForm: true})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onRequestSubmit(this.address.get('id'), event)
  }

  handleCancel(event) {
    this.setState({showForm: false})
    document.body.style.overflow = ""
  }

  handleDelete(address, event){
    this.onRequestDelete(address.get('id'))
  }

  handleOverlayClick(event){
    if(event.target.classList.contains('overlay')){
      this.setState({showForm: false})
      document.body.style.overflow = ""
    }
  }

  handleAddressSelect(event){
    if(this.props.selectable){
      let prev = this.refs.grid.getElementsByClassName('address-selected')[0]
      if( prev ){
        prev.classList.remove('address-selected')
      }
      event.currentTarget.classList.add('address-selected')
    }
  }

  render () {
    const {
      errors,
      addresses,
      selectable,
      onRequestBlur,
      onRequestFocus
    } = this.props

    const selClass = classnames('box overflow-text sub-text', {'address-selectable': selectable})

    const addrList = addresses.map( (address, index) =>
      <div key={index} className="col-4 col-md-6 col-sm-12">
        <Address
          address={address}
          className={selClass}
          onRequestEdit={this.handleShow.bind(this, address)}
          onRequestDelete={this.handleDelete.bind(this, address)}
          onRequestSelect={this.handleAddressSelect}/>
      </div>
    )


    return (
      <div>
        { addresses.size == 0 &&
          <p className="sub-text">Usted no tiene ninguna dirección registrada</p>
        }

        <div className="grid-wrap" ref='grid'>
          {addrList}

          {this.state.showForm &&
            <div
              className="overlay show"
              onClick={this.handleOverlayClick}
              onMouseEnter={(event) => document.body.style.overflow = "hidden"}
              onMouseLeave={(event) => document.body.style.overflow = ""}>

              <AddressForm
                errors={errors}
                address={this.address}
                onRequestCancel={this.handleCancel}
                onRequestSubmit={this.handleSubmit}
                onRequestBlur={onRequestBlur}
                onRequestFocus={onRequestFocus}/>
            </div>
          }
        </div>

        <button className="light-button"
          onClick={this.handleShow.bind(this, Map({}))}>
          Nueva Dirección
        </button>
      </div>
    )
  }
}


export const Address = props => {
  const {
    address,
    className,
    onRequestSelect,
    onRequestEdit,
    onRequestDelete
  } = props

  return (
    <div className={className} onClick={onRequestSelect}>
      <p className="overflow-text">
        {address.get('firstName')} {address.get('lastName')}
      </p>

      <p className="overflow-text">{address.get('telephone')}</p>

      <hr></hr>

      <p className="overflow-text">{address.get('street1')}</p>

      <p className="overflow-text">{address.get('street2')}</p>

      <p className="overflow-text">
        {address.get('city')}, {address.get('state')}
      </p>
      <p className="overflow-text">{address.get('zipcode')}</p>
      <p className="overflow-text">{address.get('country')}</p>

      <ul className="grid center end">
        <li><Link to="#" onClick={onRequestEdit}>Editar</Link></li>
        <hr className="vertical-hr"></hr>
        <li><Link to="#" onClick={onRequestDelete}>Borrar</Link></li>
      </ul>
    </div>
  )
}
