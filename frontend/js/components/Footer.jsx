import React from 'react'


export default class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){

    return (
      <div className="footer__wrapper">
        <div className="footer__divider" style={{backgroundImage: 'url(http://placehold.it/1200x128)'}}>
          <h4>Registrate y reciba información, ofertas y tips directo a su correo</h4>
          <form>
            <input className="input" type="text" placeholder="Email y Presione Entre"/>
          </form>
        </div>
      </div>
    )
  }
}
