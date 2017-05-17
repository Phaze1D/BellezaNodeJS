import React, { PropTypes } from 'react'


class AddressForm extends React.Component {
  render () {
    const {
      errors,
      address,
      onRequestCancel,
      onRequestSubmit,
      onRequestBlur,
      onRequestFocus
    } = this.props

    return (
      <div className="box with-y">
        <h3>
          Dirección
          <i className="material-icons clear-icon" onClick={onRequestCancel}>clear</i>
        </h3>
        <form className="main-form" onSubmit={onRequestSubmit}>
          <label htmlFor="firstName">Nombre</label>
          {errors.get('firstName') && <div className="error-div">{errors.get('firstName')}</div>}
          <input type="text" name="firstName"
            defaultValue={address.get('firstName')}
            onBlur={onRequestBlur}
            onFocus={onRequestFocus}/>

          <label htmlFor="lastName">Apellidos</label>
          {errors.get('lastName') && <div className="error-div">{errors.get('lastName')}</div>}
          <input type="text" name="lastName"
            defaultValue={address.get('lastName')}
            onBlur={onRequestBlur}
            onFocus={onRequestFocus}/>

          <label htmlFor="street1">Dirección</label>
          {errors.get('street1') && <div className="error-div">{errors.get('street1')}</div>}
          <input type="text" name="street1"
            defaultValue={address.get('street1')}
            onBlur={onRequestBlur}
            onFocus={onRequestFocus}/>

          <label htmlFor="street2">Colonia</label>
          {errors.get('street2') && <div className="error-div">{errors.get('street2')}</div>}
          <input type="text" name="street2"
            defaultValue={address.get('street2')}
            onBlur={onRequestBlur}
            onFocus={onRequestFocus}/>

          <label htmlFor="city">Ciudad</label>
          {errors.get('city') && <div className="error-div">{errors.get('city')}</div>}
          <input type="text" name="city"
            defaultValue={address.get('city')}
            onBlur={onRequestBlur}
            onFocus={onRequestFocus}/>

          <label htmlFor="state">Estado</label>
          {errors.get('state') && <div className="error-div">{errors.get('state')}</div>}
          <input type="text" name="state"
            defaultValue={address.get('state')}
            onBlur={onRequestBlur}
            onFocus={onRequestFocus}/>

          <label htmlFor="zipcode">Codigo Postal</label>
          {errors.get('zipcode') && <div className="error-div">{errors.get('zipcode')}</div>}
          <input type="text" name="zipcode"
            defaultValue={address.get('zipcode')}
            onBlur={onRequestBlur}
            onFocus={onRequestFocus}/>

          <label htmlFor="telephone">Telefono</label>
          {errors.get('telephone') && <div className="error-div">{errors.get('telephone')}</div>}
          <input type="text" name="telephone"
            defaultValue={address.get('telephone')}
            onBlur={onRequestBlur}
            onFocus={onRequestFocus}/>

          <input className="submit" type="submit" value="Guardar"/>
        </form>
      </div>
    )
  }
}

export default AddressForm;
