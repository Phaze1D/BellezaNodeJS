import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'


export default class Signin extends React.Component {
  render () {

    return (
      <main>
        <h3>Iniciar Sesión o Crea Nuevo Usuario</h3>

        <div className="grid around">
          <LoginFrom errors={{}}/>
          <SignupForm errors={{}}/>
        </div>
      </main>
    )
  }
}


const LoginFrom = props => {

  return (
    <section className="col-5">
      <h4 className="h-underline">Iniciar Sesión</h4>
      <h5 className="sub-text">Si usted ya tiene una cuenta, ingrese aquí.</h5>
      <form className="main-form">
        <label htmlFor="email">Email</label>
        {props.errors.last_name && <div className="error-div">{props.errors.email}</div>}
        <input type="text" name="email"/>

        <label htmlFor="password">Contraseña <Link to="/reset" className="sub-text light" style={{float: 'right'}}>(Olvidó su Contraseña)</Link></label>
        {props.errors.last_name && <div className="error-div">{props.errors.password}</div>}
        <input type="password" name="password"/>

        <input className="submit full" type="submit" value="Ingresar"/>
      </form>
    </section>
  )
}

const SignupForm = props => {

  return (
    <section className="col-5">
      <h4 className="h-underline">Crea Nuevo Usuario</h4>
      <h5 className="sub-text">
				Al crear una cuenta en nuestra tienda, usted será capaz de moverse a través del proceso
        de pago más rápido, guardar múltiples direcciones de envío.
      </h5>
      <form className="main-form">
        <label htmlFor="first_name">Nombre</label>
        {props.errors.first_name && <div className="error-div">{props.errors.first_name}</div>}
        <input type="text" name="first_name"/>

        <label htmlFor="last_name">Apellido</label>
        {props.errors.last_name && <div className="error-div">{props.errors.last_name}</div>}
        <input type="text" name="last_name"/>

        <label htmlFor="email">Email</label>
        {props.errors.email && <div className="error-div">{props.errors.email}</div>}
        <input type="text" name="email"/>

        <label htmlFor="password">Contraseña </label>
        {props.errors.password && <div className="error-div">{props.errors.password}</div>}
        <input type="password" name="password"/>

        <input className="submit full" type="submit" value="Crear"/>
      </form>
    </section>
  )
}
