import React, { PropTypes } from 'react'

class PasswordReset extends React.Component {
  render () {

    return (
      <main>
        <h2>¿Olvidaste Tu Contraseña?</h2>
        <p className="sub">
					Proporcione a su cuenta de correo electrónico para recibir un correo electrónico para restablecer su contraseña
				</p>

        <form className="main-form" style={{width: '100%', maxWidth: '400px'}}>
          <label htmlFor="email">Email</label>
          <input name="email" type="text"/>
          <input  className="submit full"  type="submit" value="Enviar"/>
        </form>
      </main>
    )
  }
}

export default PasswordReset;
