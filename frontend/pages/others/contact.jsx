import React, { PropTypes } from 'react'

class Contact extends React.Component {
  render () {

    return (
      <main>
        <h2>Contáctanos</h2>
        <form className="green-form">
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" className="input"/>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" className="input"/>

          <label htmlFor="question">Pregunta</label>
          <textarea name="question" className="input" rows="5" cols="40" style={{width: '100%'}}></textarea>

          <input type="submit" className="submit" value="Enviar"/>
        </form>
      </main>
    )
  }
}

export default Contact;
