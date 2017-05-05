import React, { PropTypes } from 'react'

class AddressForm extends React.Component {
  render () {

    return (
      <div className="address__form">
        <h3>
          Direccion
          <i className="material-icons" onClick={this.props.onRequestCancel}>clear</i>
        </h3>
        <form className="green-form">
          <label htmlFor="firstName">Nombre</label>
          <input className="input" type="text" name="firstName" defaultValue={this.props.firstName}/>

          <label htmlFor="lastName">Apellidos</label>
          <input className="input" type="text" name="lastName" defaultValue={this.props.lastName}/>

          <label htmlFor="street1">Direccion</label>
          <input className="input" type="text" name="street1" defaultValue={this.props.street1}/>

          <label htmlFor="street2">Colonia</label>
          <input className="input" type="text" name="street2" defaultValue={this.props.street2}/>

          <label htmlFor="city">Ciudad</label>
          <input className="input" type="text" name="city" defaultValue={this.props.city}/>

          <label htmlFor="state">Estado</label>
          <input className="input" type="text" name="state" defaultValue={this.props.state}/>

          <label htmlFor="zipcode">Codigo Postal</label>
          <input className="input" type="text" name="zipcode" defaultValue={this.props.zipcode}/>

          <label htmlFor="telephone">Telefono</label>
          <input className="input" type="text" name="telephone" defaultValue={this.props.telephone}/>

          <input className="submit" type="submit" value="Guardar"/>
        </form>
      </div>
    )
  }
}

export default AddressForm;
