import React, { PropTypes } from 'react'

class PasswordReset extends React.Component {
  render () {

    return (
      <main>
        <h2>¿Olvidaste Tu Contraseña?</h2>
        <p className="sub">
					Proporcione a su cuenta de correo electrónico para recibir un correo electrónico para restablecer su contraseña
				</p>

        <form className="green-form">
          <label htmlFor="email">Email</label>
          <input name="email" type="text" className="input"/>
          <input type="submit" className="submit" value="Enviar"/>
        </form>
      </main>
    )
  }
}

export default PasswordReset;
