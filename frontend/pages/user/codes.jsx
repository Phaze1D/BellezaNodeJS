import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { dateOptions } from 'utils/date'
import { userLogout } from 'actions/user'
import { getUserCodes, resetCodes } from 'actions/discountcode'




/**
* HTTP - GET
* @param {array} codes - An array of discount codes that belong to current user
*
* LOCAL - POST
* @param {object} resetLogout - Logouts the user by reseting it with empty object
*
* LOCAL - POST (on unmount)
* @param {array} resetCodes - An empty array to reset the user codes
*/

@connect(store => {
  return {
    user: store.user,
    codes: store.codes
  }
})
export default class UserCodes extends React.Component {
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentDidMount() {
    let user_id = this.props.match.params.id
    this.props.dispatch(getUserCodes(user_id, this.props.user.get('token')))
    .then()
    .catch(this.handleError)
  }

  componentWillUnmount() {
    this.props.dispatch(resetCodes())
  }

  handleLogout(event) {
    event.preventDefault()
    this.props.dispatch(userLogout())
  }

  handleError(response) {

  }

  render () {
    const {
      codes
    } = this.props

    const aList = codes.get('active').map( (code, index) =>
      <CodeItem key={index} code={code}/>
    )

    const dList = codes.get('deactive').map( (code, index) =>
      <CodeItem key={index} code={code}/>
    )

    return (
      <section className="col-9 col-sm-8 col-xs-11">
        <h2>
          Códigos de Descuento
          <Link to="#" className="sub-text light" style={{float: 'right'}}
            onClick={this.handleLogout}>Salir</Link>
        </h2>

        <div className="grid-wrap top around">

          {codes.get('active').size > 0 &&
            <article className="col-5 col-sm-12 box active">
              <div className="code-top">Activados</div>
              {aList}
            </article>
          }

          {codes.get('deactive').size > 0 &&
            <article className="col-5 col-sm-12 box deactive">
              <div className="code-top">Desactivados</div>
              {dList}
            </article>
          }

          {codes.get('active').size == 0 && codes.get('deactive').size == 0 &&
            <h4 className="sub-text">Cero Códigos Encontrados</h4>
          }

        </div>

      </section>
    )
  }
}

const CodeItem = props => (
  <div className="code-item sub-text">
    <p >Codigo: <span>{props.code.get('code')}</span></p>
    <p>Descuento: <span>{props.code.get('discount')}% </span></p>
    <p>Fecha de Caducidad: <span>{new Date(props.code.get('expires_date')).toLocaleString('en-us', dateOptions)}</span></p>
  </div>
)
