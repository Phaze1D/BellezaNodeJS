import React, { PropTypes } from 'react'
import { resetErrors } from 'actions/errors'
import {
  addressNew,
  addressUpdate,
  validateAddress
} from 'actions/address'


class AddressForm extends React.Component {
  constructor(props){
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors())
  }

  handleSubmit(event){
    event.preventDefault()
    let id = this.props.address.get('id')
    let elements = event.target.elements
    let formData = new FormData()
    formData.append('firstName', elements.firstName.value)
    formData.append('lastName', elements.lastName.value)
    formData.append('street1', elements.street1.value)
    formData.append('street2', elements.street2.value)
    formData.append('city', elements.city.value)
    formData.append('state', elements.state.value)
    formData.append('zipcode', elements.zipcode.value)
    formData.append('telephone', elements.telephone.value)

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
    this.props.dispatch(resetErrors(event.target.name))
  }

  handleError(response){

  }

  render () {
    const {
      errors,
      address,
      onRequestCancel,
    } = this.props

    return (
      <div className="box with-y">
        <h3>
          Dirección
          <i className="material-icons clear-icon" onClick={onRequestCancel}>clear</i>
        </h3>
        <form className="main-form" onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">Nombre</label>
          {errors.get('firstName') && <div className="error-div">{errors.get('firstName')}</div>}
          <input type="text" name="firstName"
            defaultValue={address.get('firstName')}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}/>

          <label htmlFor="lastName">Apellidos</label>
          {errors.get('lastName') && <div className="error-div">{errors.get('lastName')}</div>}
          <input type="text" name="lastName"
            defaultValue={address.get('lastName')}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}/>

          <label htmlFor="street1">Dirección</label>
          {errors.get('street1') && <div className="error-div">{errors.get('street1')}</div>}
          <input type="text" name="street1"
            defaultValue={address.get('street1')}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}/>

          <label htmlFor="street2">Colonia</label>
          {errors.get('street2') && <div className="error-div">{errors.get('street2')}</div>}
          <input type="text" name="street2"
            defaultValue={address.get('street2')}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}/>

          <label htmlFor="city">Ciudad</label>
          {errors.get('city') && <div className="error-div">{errors.get('city')}</div>}
          <input type="text" name="city"
            defaultValue={address.get('city')}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}/>

          <label htmlFor="state">Estado</label>
          {errors.get('state') && <div className="error-div">{errors.get('state')}</div>}
          <input type="text" name="state"
            defaultValue={address.get('state')}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}/>

          <label htmlFor="zipcode">Codigo Postal</label>
          {errors.get('zipcode') && <div className="error-div">{errors.get('zipcode')}</div>}
          <input type="text" name="zipcode"
            defaultValue={address.get('zipcode')}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}/>

          <label htmlFor="telephone">Telefono</label>
          {errors.get('telephone') && <div className="error-div">{errors.get('telephone')}</div>}
          <input type="text" name="telephone"
            defaultValue={address.get('telephone')}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}/>

          <input className="submit" type="submit" value="Guardar"/>
        </form>
      </div>
    )
  }
}

export default AddressForm;
