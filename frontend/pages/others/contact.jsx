import React, { PropTypes } from 'react'

class Contact extends React.Component {
  render () {

    return (
      <main>
        <h2>Contáctanos</h2>
        <form className="main-form" style={{width: '400px'}}>
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
