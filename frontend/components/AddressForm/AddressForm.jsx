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
    formData.append('first_name', elements.first_name.value)
    formData.append('last_name', elements.last_name.value)
    formData.append('street', elements.street.value)
    formData.append('street2', elements.street2.value)
    formData.append('city', elements.city.value)
    formData.append('state', elements.state.value)
    formData.append('zipcode', elements.zipcode.value)
    formData.append('telephone', elements.telephone.value)

    if(id){
      this.props.dispatch(addressUpdate(formData, id, this.props.userId, this.props.token))
      .then()
      .catch(this.handleError)
    }else{
      this.props.dispatch(addressNew(formData, this.props.userId, this.props.token))
      .then()
      .catch(this.handleError)
    }
  }

  handleInputBlur(event) {
    let fieldData = {}
    fieldData[event.target.name] = event.target.value
    this.props.dispatch(validateAddress(fieldData, this.props.token))
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
          <label htmlFor="first_name">Nombre</label>
          {errors.get('first_name') && <div className="error-div">{errors.get('first_name')}</div>}
          <input type="text" name="first_name"
            defaultValue={address.get('first_name')}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}/>

          <label htmlFor="last_name">Apellidos</label>
          {errors.get('last_name') && <div className="error-div">{errors.get('last_name')}</div>}
          <input type="text" name="last_name"
            defaultValue={address.get('last_name')}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}/>

          <label htmlFor="street">Dirección</label>
          {errors.get('street') && <div className="error-div">{errors.get('street')}</div>}
          <input type="text" name="street"
            defaultValue={address.get('street')}
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
