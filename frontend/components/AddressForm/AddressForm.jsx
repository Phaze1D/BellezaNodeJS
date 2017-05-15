import React, { PropTypes } from 'react'

/**
* HTTP - POST
* @param {object} address - The new address info
*
* HTTP - GET
* @param {object} errors - An object of form errors
*
* LOCAL - POST
* @param {string} resetOne - A string to reset one property of the error object
*
* LOCAL - POST (on unmount)
* @param {object} resetAll - An empty object to reset errors
*/

class AddressForm extends React.Component {
  render () {

    return (
      <div className="box with-y">
        <h3>
          Dirección
          <i className="material-icons clear-icon" onClick={this.props.onRequestCancel}>clear</i>
        </h3>
        <form className="main-form">
          <label htmlFor="firstName">Nombre</label>
          <input type="text" name="firstName" defaultValue={this.props.firstName}/>

          <label htmlFor="lastName">Apellidos</label>
          <input type="text" name="lastName" defaultValue={this.props.lastName}/>

          <label htmlFor="street1">Dirección</label>
          <input type="text" name="street1" defaultValue={this.props.street1}/>

          <label htmlFor="street2">Colonia</label>
          <input type="text" name="street2" defaultValue={this.props.street2}/>

          <label htmlFor="city">Ciudad</label>
          <input type="text" name="city" defaultValue={this.props.city}/>

          <label htmlFor="state">Estado</label>
          <input type="text" name="state" defaultValue={this.props.state}/>

          <label htmlFor="zipcode">Codigo Postal</label>
          <input type="text" name="zipcode" defaultValue={this.props.zipcode}/>

          <label htmlFor="telephone">Telefono</label>
          <input type="text" name="telephone" defaultValue={this.props.telephone}/>

          <input className="submit" type="submit" value="Guardar"/>
        </form>
      </div>
    )
  }
}

export default AddressForm;
