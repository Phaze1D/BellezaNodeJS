import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AddressList from 'components/AddressList/AddressList'
import { userLogout, resetUserErrors } from 'actions/user'
import {
  addressNew,
  addressUpdate,
  validateAddress,
  addressDelete
} from 'actions/address'


@connect( store => {
  return {
    user: store.user
  }
})
class UserAddresses extends React.Component {
  constructor(props){
    super(props)
    this.state = {showForm: false}

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  handleSubmit(id, event){
    let elements = event.target.elements
    let formData = new FormData()
    formData.append('firstName', elements.firstName)
    formData.append('lastName', elements.lastName)
    formData.append('street1', elements.street1)
    formData.append('street2', elements.street2)
    formData.append('city', elements.city)
    formData.append('state', elements.state)
    formData.append('zipcode', elements.zipcode)
    formData.append('telephone', elements.telephone)

    if(id){
      this.props.dispatch(addressUpdate(formData, id))
      .then()
      .catch(this.handleError)
    }else{
      this.props.dispatch(addressNew(formData))
      .then()
      .catch(this.handleError)
    }
  }

  handleInputBlur(event) {
    let fieldData = new FormData()
    fieldData.append(event.target.name, event.target.value)

    this.props.dispatch(validateAddress(fieldData))
    .then()
    .catch(this.handleError)
  }

  handleInputFocus(event) {
    this.props.dispatch(resetUserErrors(event.target.name))
  }

  handleDelete(id){
    this.props.dispatch(addressDelete(id))
    .then()
    .catch(this.handleError)
  }

  handleLogout(event){
    event.preventDefault()
    this.props.dispatch(userLogout())
  }

  handleError(response){

  }

  render () {
    const addresses = this.props.user.get('addresses')
    const errors = this.props.user.get('errors')

    return (
      <section className="col-9 col-sm-8 col-xs-11">
        <h2>
          Mi Directorio
          <Link to="#" className="sub-text light" style={{float: 'right'}}
            onClick={this.handleLogout}>Salir</Link>
        </h2>

        <AddressList
          ref="addressList"
          selectable={false}
          addresses={addresses}
          onRequestSubmit={this.handleSubmit}
          onRequestBlur={this.handleInputBlur}
          onRequestFocus={this.handleInputFocus}
          errors={errors}/>

      </section>
    )
  }
}

export default UserAddresses;
