import React, { PropTypes } from 'react'

class UserEdit extends React.Component {
  render () {

    return (
      <div className="box with-y">
        <h3>
          Editar Detalles
          <i className="material-icons clear-icon" onClick={this.props.onRequestCancel}>clear</i>
        </h3>
        <form className="main-form">
          <label htmlFor="firstName">Nombre</label>
          <input type="text" name="firstName" defaultValue={this.props.firstName}/>

          <label htmlFor="lastName">Apellidos</label>
          <input type="text" name="lastName" defaultValue={this.props.lastName}/>

          <label htmlFor="street1">Email</label>
          <input type="text" name="email" defaultValue={this.props.email}/>

          <label htmlFor="telephone">Telefono</label>
          <input type="text" name="telephone" defaultValue={this.props.telephone}/>

          <input className="submit" type="submit" value="Guardar"/>
        </form>
      </div>
    )
  }
}

export default UserEdit;
