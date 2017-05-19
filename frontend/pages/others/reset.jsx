import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { passwordReset } from 'actions/others'
import { resetErrors } from 'actions/errors'

/**
* HTTP - POST
* @param {object} passwordReset - The password reset info
*/

@connect( store => {
  return {
    others: store.others,
    errors: store.errors
  }
})
class PasswordReset extends React.Component {
  constructor(props){
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors())
  }

  handleSubmit(event){
    event.preventDefault()
    let elements = event.target.elements
    let formData = new FormData()
    formData.append('email', elements.email.value)

    this.props.dispatch(passwordReset(formData))
    .then()
    .catch(this.handleError)
  }

  handleInputFocus(event){
    this.props.dispatch(resetErrors(event.target.name))
  }

  handleError(response){

  }

  render () {
    const errors = this.props.errors

    return (
      <main>
        <h2>¿Olvidaste Tu Contraseña?</h2>
        <p className="sub">
					Proporcione a su cuenta de correo electrónico para recibir un correo electrónico para restablecer su contraseña
				</p>

        <form className="main-form" style={{width: '100%', maxWidth: '400px'}} onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          {errors.get('email') && <div className="error-div">{errors.get('email')}</div>}
          <input name="email" type="text" onFocus={this.handleInputFocus}/>
          <input  className="submit full"  type="submit" value="Enviar"/>
        </form>
      </main>
    )
  }
}

export default PasswordReset;
