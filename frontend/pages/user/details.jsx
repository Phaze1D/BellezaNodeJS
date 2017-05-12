import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import UserEdit from 'components/UserEdit/UserEdit'


import {user} from '../../../fake'
const us = user()

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
      <p key={index} className="overflow-text sub-text primary">{tel}</p>
    )

    const addreList = us.addresses.map( (add, index) =>
      <p key={index} className="overflow-text sub-text primary">{add.street1}</p>
    )

    return (
      <section className="col-9">
        <h2>
          Detalles
          <Link to="#" className="sub-text light" style={{float: 'right'}}>Salir</Link>
        </h2>

        <div className="grid top">
          <div className="col-6">
            <h4 className="h-underline">
              Bienvenido {us.firstName} {us.lastName}
              <span style={{float: 'right'}}>
                ( <Link to="#" className="sub-text light" onClick={this.handleShow}>Editar</Link> )
              </span>
            </h4>

            <div className="grid-wrap top">
              <div className="col-6">
                <p className="sub-text">Teléfonos: </p>
                {teleList}
              </div>

              <div className="col-6">
                <p className="sub-text">Direcciones: </p>
                {addreList}
              </div>

              <div className="col-6">
                <p className="sub-text">Email: </p>
                <p className="overflow-text sub-text primary">{us.email}</p>
              </div>
            </div>

          </div>

          <div className="col-6">
            <h4 className="h-underline">Sus Preferencias</h4>

            <form>
              <label htmlFor="pref" className="grid center sub-text col-12">
                <input type="checkbox" name="pref" className="col-1"/>
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
