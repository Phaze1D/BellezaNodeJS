import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import UserEdit from 'components/UserEdit/UserEdit'


import { user } from '../../../fake.js'

const us = user();

class UserDetails extends React.Component {
  constructor(props){
    super(props)
    this.state = {showForm: false}

    this.handleShow = this.handleShow.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleOverlayClick = this.handleOverlayClick.bind(this)
  }

  handleShow(event){
    event.preventDefault()
    this.setState({showForm: true})
  }

  handleCancel(event){
    this.setState({showForm: false})
    document.body.style.overflow = ""
  }

  handleOverlayClick(event){
    if(event.target.classList.contains('overlay')){
      this.setState({showForm: false})
      document.body.style.overflow = ""
    }
  }

  render () {

    const teleList = us.telephones.map( (tel, index) =>
      <p key={index} className="overflow-text">{tel}</p>
    )

    const addreList = us.addresses.map( (add, index) =>
      <p key={index} className="overflow-text">{add.street1}</p>
    )

    return (
      <section className="user__section smooth">
        <h2>
          Detalles
          <Link to="#">Salir</Link>
        </h2>

        <div className="detail__wrapper">
          <div className="detail__section">
            <h4 className="h-underline">
              Bienvenido {us.firstName} {us.lastName}
              <span>
                ( <Link to="#" onClick={this.handleShow}>Editar</Link> )
              </span>
            </h4>

            <div className="detail__info">
              <h5>Teléfonos: </h5>
              {teleList}
            </div>

            <div className="detail__info">
              <h5>Direcciones: </h5>
              {addreList}
            </div>

            <div className="detail__info">
              <h5>Email: </h5>
              <p className="overflow-text">{us.email}</p>
            </div>
          </div>

          <div className="detail__section">
            <h4 className="h-underline">Sus Preferencias</h4>

            <form className="detail__form">
              <input type="checkbox" name="pref"/>
              <label htmlFor="pref">
                Por favor agregarme a Neals Yard Remedies ofertas y actualizaciones por correo electrónico.
              </label>

            </form>
          </div>

          {this.state.showForm &&
            <div
              className="overlay"
              onClick={this.handleOverlayClick}
              onMouseEnter={(event) => document.body.style.overflow = "hidden"}
              onMouseLeave={(event) => document.body.style.overflow = ""}>

              <UserEdit onRequestCancel={this.handleCancel} {...us}/>
            </div>
          }
        </div>
      </section>
    )
  }
}

export default UserDetails;
