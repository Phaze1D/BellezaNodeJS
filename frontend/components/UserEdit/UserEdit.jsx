import React, { PropTypes } from 'react'

class UserEdit extends React.Component {
  render () {

    return (
      <div className="address__form">
        <h3>
          Editar Detalles
          <i className="material-icons" onClick={this.props.onRequestCancel}>clear</i>
        </h3>
        <form className="green-form">
          <label htmlFor="firstName">Nombre</label>
          <input className="input" type="text" name="firstName" defaultValue={this.props.firstName}/>

          <label htmlFor="lastName">Apellidos</label>
          <input className="input" type="text" name="lastName" defaultValue={this.props.lastName}/>

          <label htmlFor="street1">Email</label>
          <input className="input" type="text" name="email" defaultValue={this.props.email}/>

          <label htmlFor="telephone">Telefono</label>
          <input className="input" type="text" name="telephone" defaultValue={this.props.telephone}/>

          <input className="submit" type="submit" value="Guardar"/>
        </form>
      </div>
    )
  }
}

export default UserEdit;
