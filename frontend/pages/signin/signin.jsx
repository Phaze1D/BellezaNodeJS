import React, { PropTypes } from 'react'


export default class Signin extends React.Component {
  render () {

    return (
      <main>
        <h3>Iniciar Sesión o Crea Nuevo Usuario</h3>

        <div className="sign__wrapper">
          <LoginFrom errors={{}}/>
          <SignupForm errors={{}}/>
        </div>
      </main>
    )
  }
}


const LoginFrom = props => {

  return (
    <section className="sign__section">
      <h4 className="h-underline">Iniciar Sesión</h4>
      <p>Si usted ya tiene una cuenta, ingrese aquí.</p>
      <form className="green-form">
        <label htmlFor="email">Email</label>
        {props.errors.last_name && <div className="error">{props.errors.email}</div>}
        <input className="input" type="email" name="email"/>

        <label htmlFor="password">Contraseña</label>
        {props.errors.last_name && <div className="error">{props.errors.password}</div>}
        <input className="input" type="password" name="password"/>

        <input className="submit" type="submit" value="Ingresar"/>
      </form>
    </section>
  )
}

const SignupForm = props => {

  return (
    <section className="sign__section">
      <h4 className="h-underline">Crea Nuevo Usuario</h4>
      <p>
				Al crear una cuenta en nuestra tienda, usted será capaz de moverse a través del proceso
        de pago más rápido, guardar múltiples direcciones de envío.
      </p>
      <form className="green-form">
        <label htmlFor="first_name">Nombre</label>
        {props.errors.first_name && <div className="error">{props.errors.first_name}</div>}
        <input className="input" type="text" name="first_name"/>

        <label htmlFor="last_name">Apellido</label>
        {props.errors.last_name && <div className="error">{props.errors.last_name}</div>}
        <input className="input" type="text" name="last_name"/>

        <label htmlFor="email">Email</label>
        {props.errors.email && <div className="error">{props.errors.email}</div>}
        <input className="input" type="email" name="email"/>

        <label htmlFor="password">Contraseña</label>
        {props.errors.password && <div className="error">{props.errors.password}</div>}
        <input className="input" type="password" name="password"/>

        <input className="submit" type="submit" value="Crear"/>
      </form>
    </section>
  )
}
