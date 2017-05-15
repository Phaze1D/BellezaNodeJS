import React, { PropTypes } from 'react'

/**
* HTTP - POST
* @param {object} question - The question object to ask
*/
class Contact extends React.Component {
  render () {

    return (
      <main>
        <h2>Contáctanos</h2>
        <form className="main-form" style={{maxWidth: '400px', width: '100%'}}>
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name"/>
          <label htmlFor="email">Email</label>
          <input type="text" name="email"/>

          <label htmlFor="question">Pregunta</label>
          <textarea name="question" className="input" rows="5" cols="40"></textarea>

          <input className="submit full" type="submit" value="Enviar"/>
        </form>
      </main>
    )
  }
}

export default Contact;
