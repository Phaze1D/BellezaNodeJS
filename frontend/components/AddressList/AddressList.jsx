import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import AddressForm from 'components/AddressForm/AddressForm'
import classnames from 'classnames'
import { Map } from 'immutable'
import { addressDelete } from 'actions/address'
import { addCartAddress } from 'actions/cart'

// REMEMBER TO RESET ERRORS ON CANCEL


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
    let prev = this.refs.grid.getElementsByClassName('address-selected')[0]
    if( prev ){
      prev.classList.remove('address-selected')
    }
  }

  handleOverlayClick(event){
    if(event.target.classList.contains('overlay')){
      this.setState({showForm: false})
      document.body.style.overflow = ""
      let prev = this.refs.grid.getElementsByClassName('address-selected')[0]
      if( prev ){
        prev.classList.remove('address-selected')
      }
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
      selectActionType,
      dispatch,
      token,
      userId
    } = this.props

    const addrList = addresses.map( (address, index) =>
      <div key={address.get('id')} className="col-4 col-md-6 col-sm-12">
        <Address
          address={address.set('index', index)}
          selectable={selectable}
          selectActionType={selectActionType}
          dispatch={dispatch}
          userId={userId}
          token={token}
          onRequestEdit={this.handleShow.bind(this, address.set('index', index))}
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
                token={token}
                userId={userId}
                dispatch={dispatch}
                onRequestCancel={this.handleCancel}/>
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


class Address extends React.PureComponent {
  constructor(props){
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(event) {
    this.props.onRequestSelect(event)
    if(this.props.selectable){
      this.props.dispatch(addCartAddress(this.props.address.toJS(), this.props.selectActionType))
    }
  }

  handleDelete(event){
    event.preventDefault()
    let index = this.props.address.get('index')
    let id = this.props.address.get('id')
    let userId = this.props.userId
    let token = this.props.token
    this.props.dispatch(addressDelete(index, id, userId, token))
    .then()
    .catch(this.handleError)
  }

  handleError(response){

  }

  render(){
    const {
      address,
      selectable,
      onRequestEdit
    } = this.props

    const selClass = classnames('box overflow-text sub-text', {'address-selectable': selectable})

    return (
      <div className={selClass} onClick={this.handleSelect}>
        <p className="overflow-text">
          {address.get('first_name')} {address.get('last_name')}
        </p>

        <p className="overflow-text">{address.get('telephone')}</p>

        <hr></hr>

        <p className="overflow-text">{address.get('street')}</p>

        <p className="overflow-text">{address.get('street2')}</p>

        <p className="overflow-text">
          {address.get('city')}, {address.get('state')}
        </p>
        <p className="overflow-text">{address.get('zipcode')}</p>
        <p className="overflow-text">{address.get('country')}</p>

        <ul className="grid center end">
          <li><Link to="#" onClick={onRequestEdit}>Editar</Link></li>
          <hr className="vertical-hr"></hr>
          <li><Link to="#" onClick={this.handleDelete}>Borrar</Link></li>
        </ul>
      </div>
    )
  }
}
