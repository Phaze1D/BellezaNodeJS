import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  userSignUp,
  userLogin,
  validateUserNew,
  resetUserErrors
} from 'actions/user'

/**
* HTTP - POST
* @param {object} loginInfo - The email and password to login the user
*
* HTTP - POST
* @param {object} signupInfo - A new user's info
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

@connect( store => {
  return {
    user: store.user
  }
})
export default class Signin extends React.Component {
  constructor(props){
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  handleLogin(event){
    event.preventDefault()
    let elements = event.target.elements
    let formData = new FormData()
    formData.append('email', elements.email)
    formData.append('password', elements.password)

    this.props.dispatch(userLogin(formData))
    .then()
    .catch(this.handleError)
  }

  handleSignUp(event){
    event.preventDefault()
    let elements = event.target.elements
    let formData = new FormData()
    formData.append('email', elements.email)
    formData.append('password', elements.password)
    formData.append('firstName', elements.firstName)
    formData.append('lastName', elements.lastName)

    this.props.dispatch(userSignUp(formData))
    .then()
    .catch(this.handleError)
  }

  handleInputBlur(event){
    let fieldData = new FormData()
    fieldData.append(event.target.name, event.target.value)

    this.props.dispatch(validateUserNew(fieldData))
    .then()
    .catch(this.handleError)
  }

  handleInputFocus(event){
    this.props.dispatch(resetUserErrors(event.target.name))
  }

  handleError(response){

  }

  render () {
    const {
      user
    } = this.props

    return (
      <main>
        <h3>Iniciar Sesión o Crea Nuevo Usuario</h3>

        <div className="grid-wrap around">
          <LoginFrom
            errors={user.get('errors')}
            onRequestSubmit={this.handleLogin}/>

          <SignUpForm
            errors={user.get('errors')}
            onRequestSubmit={this.handleSignUp}
            onRequestBlur={this.handleInputBlur}
            onRequestFocus={this.handleInputFocus}/>
        </div>
      </main>
    )
  }
}

const LoginFrom = props => {

  return (
    <section className="col-5 col-xs-10">
      <h4 className="h-underline">Iniciar Sesión</h4>
      <h5 className="sub-text">Si usted ya tiene una cuenta, ingrese aquí.</h5>
      <form className="main-form" onSubmit={props.onRequestSubmit}>
        <label htmlFor="email">Email</label>
        {props.errors.get('login') && <div className="error-div">{props.errors.get('login')}</div>}
        <input type="text" name="email" />

        <label htmlFor="password">Contraseña <Link to="/reset" className="sub-text light" style={{float: 'right'}}>(Olvidó su Contraseña)</Link></label>
        <input type="password" name="password"/>

        <input className="submit full" type="submit" value="Ingresar"/>
      </form>
    </section>
  )
}

const SignUpForm = props => {

  return (
    <section className="col-5 col-xs-10">
      <h4 className="h-underline">Crea Nuevo Usuario</h4>
      <h5 className="sub-text">
				Al crear una cuenta en nuestra tienda, usted será capaz de moverse a través del proceso
        de pago más rápido, guardar múltiples direcciones de envío.
      </h5>
      <form className="main-form" onSubmit={props.onRequestSubmit}>
        <label htmlFor="firstName">Nombre</label>
        {props.errors.get('firstName') && <div className="error-div">{props.errors.get('firstName')}</div>}
        <input type="text" name="firstName"
          onBlur={props.onRequestBlur}
          onFocus={props.onRequestFocus}/>

        <label htmlFor="lastName">Apellido</label>
        {props.errors.get('lastName') && <div className="error-div">{props.errors.get('lastName')}</div>}
        <input type="text" name="lastName"
          onBlur={props.onRequestBlur}
          onFocus={props.onRequestFocus}/>

        <label htmlFor="email">Email</label>
        {props.errors.get('email') && <div className="error-div">{props.errors.get('email')}</div>}
        <input type="text" name="email"
          onBlur={props.onRequestBlur}
          onFocus={props.onRequestFocus}/>

        <label htmlFor="password">Contraseña </label>
        {props.errors.get('password') && <div className="error-div">{props.errors.get('password')}</div>}
        <input type="password" name="password"
          onBlur={props.onRequestBlur}
          onFocus={props.onRequestFocus}/>

        <input className="submit full" type="submit" value="Crear"/>
      </form>
    </section>
  )
}
