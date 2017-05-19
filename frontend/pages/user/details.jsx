import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addMailer } from 'actions/others'
import { resetErrors } from 'actions/errors'
import {
  userUpdate,
  validateUserUpdate,
  userLogout,
} from 'actions/user'




/**
* LOCAL - GET
* @param {object} user - user info (telephone, addresses)
*
* LOCAL - POST
* @param {object} resetLogout - Logouts the user by reseting it with empty object
*/

@connect( store => {
  return {
    user: store.user,
    errors: store.errors
  }
})
class UserDetails extends React.Component {
  constructor(props){
    super(props)
    this.state = {showForm: false}

    this.handleShow = this.handleShow.bind(this)
    this.handleOverlayClick = this.handleOverlayClick.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handlePreference = this.handlePreference.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentWillUnmount() {
    this.props.dispatch(resetErrors())
  }

  handleShow(event){
    event.preventDefault()
    this.setState({showForm: true})
  }

  handleOverlayClick(event){
    if(event.target.classList.contains('overlay')){
      this.setState({showForm: false})
      document.body.style.overflow = ""
    }
  }

  handleCancel(event){
    this.setState({showForm: false})
    document.body.style.overflow = ""
  }

  handleSubmit(event){
    event.preventDefault()
    let elements = event.target.elements
    let formData = new FormData()
    formData.append('telephone', elements.telephone.value)
    formData.append('firstName', elements.firstName.value)
    formData.append('lastName', elements.lastName.value)

    this.props.dispatch(userUpdate(formData))
    .then()
    .catch(this.handleError)
  }

  handleInputBlur(event){
    let fieldData = new FormData()
    fieldData.append(event.target.name, event.target.value)

    this.props.dispatch(validateUserUpdate(fieldData))
    .then()
    .catch(this.handleError)
  }

  handleInputFocus(event){
    this.props.dispatch(resetErrors(event.target.name))
  }

  handlePreference(event){
    const value = event.target.value === 'true' ? false : true
    const email = this.props.user.get('email')
    let formData = new FormData()
    formData.append('email', email)
    formData.append('value', value)

    this.props.dispatch(addMailer(formData, true))
    .then()
    .catch(this.handleError)
  }

  handleLogout(event){
    event.preventDefault()
    this.props.dispatch(userLogout())
  }

  handleError(response){

  }

  render () {
    const {
      user,
      errors
    } = this.props

    const teleList = user.get('telephones').map( (tel, index) =>
      <p key={index} className="overflow-text sub-text primary">{tel}</p>
    )

    const addreList = user.get('addresses').map( (add, index) =>
      <p key={index} className="overflow-text sub-text primary">{add.get('street1')}</p>
    )

    return (
      <section className="col-9 col-sm-8 col-xs-11">
        <h2>
          Detalles
          <Link to="#" className="sub-text light" style={{float: 'right'}}
            onClick={this.handleLogout}>Salir</Link>
        </h2>

        <div className="grid-wrap top">
          <div className="col-6 col-sm-12">
            <h4 className="h-underline overflow-text">
              <span className="overflow-text" style={{float: 'left', maxWidth: 'calc(100% - 70px)'}}>
                {user.get('firstName')} {user.get('lastName')}
              </span>
              <span style={{float: 'right'}}>
                ( <Link to="#" className="sub-text light" onClick={this.handleShow}>Editar</Link> )
              </span>
            </h4>

            <div className="grid-wrap top">
              <div className="col-6">
                <p className="sub-text">Teléfono: </p>
                {teleList}
              </div>

              <div className="col-6">
                <p className="sub-text">Direcciones: </p>
                {addreList}
              </div>

              <div className="col-6 grow">
                <p className="sub-text">Email: </p>
                <p className="overflow-text sub-text primary">{user.get('email')}</p>
              </div>
            </div>

          </div>

          <div className="col-6 col-sm-12">
            <h4 className="h-underline">Sus Preferencias</h4>


            <label htmlFor="pref" className="grid center sub-text col-12">
              <input type="checkbox" name="pref"
                className="col-1 col-md-2 col-sm-1"
                checked={user.get('preferences')}
                value={user.get('preferences')}
                onChange={this.handlePreference}/>
              Por favor agregarme a Neals Yard Remedies ofertas y actualizaciones por correo electrónico.
            </label>
          </div>

          {this.state.showForm &&
            <div
              className="overlay show"
              onClick={this.handleOverlayClick}
              onMouseEnter={(event) => document.body.style.overflow = "hidden"}
              onMouseLeave={(event) => document.body.style.overflow = ""}>

              <UserEdit
                user={user}
                errors={errors}
                onRequestSubmit={this.handleSubmit}
                onRequestCancel={this.handleCancel}
                onRequestBlur={this.handleInputBlur}
                onRequestFocus={this.handleInputFocus}/>
            </div>
          }
        </div>
      </section>
    )
  }
}

export default UserDetails;


const UserEdit = (props) => {
  const {
    user,
    errors,
    onRequestCancel,
    onRequestSubmit,
    onRequestBlur,
    onRequestFocus
  } = props


  return (
    <div className="box with-y">
      <h3>
        Editar Detalles
        <i className="material-icons clear-icon" onClick={onRequestCancel}>clear</i>
      </h3>
      <form className="main-form" onSubmit={onRequestSubmit}>
        <label htmlFor="firstName">Nombre</label>
        {errors.get('firstName') && <div className="error-div">{errors.get('firstName')}</div>}
        <input type="text" name="firstName"
          defaultValue={user.get('firstName')}
          onBlur={onRequestBlur}
          onFocus={onRequestFocus}/>

        <label htmlFor="lastName">Apellidos</label>
        {errors.get('lastName') && <div className="error-div">{errors.get('lastName')}</div>}
        <input type="text" name="lastName"
          defaultValue={user.get('lastName')}
          onBlur={onRequestBlur}
          onFocus={onRequestFocus}/>

        <label htmlFor="email">Email</label>
        <input type="text" name="email" defaultValue={user.get('email')} disabled={true}/>

        <label htmlFor="telephone">Telefono</label>
        {errors.get('telephone') && <div className="error-div">{errors.get('telephone')}</div>}
        <input type="text" name="telephone"
          defaultValue={user.get('telephone')}
          onBlur={onRequestBlur}
          onFocus={onRequestFocus}/>

        <input className="submit" type="submit" value="Guardar"/>
      </form>
    </div>
  )
}
