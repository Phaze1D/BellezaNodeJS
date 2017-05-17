import React, { PropTypes } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import UserDetails from 'pages/user/details'
import UserOrders from 'pages/user/orders'
import UserAddresses from 'pages/user/addresses'
import UserCodes from 'pages/user/codes'


/**
* LOCAL - GET
* @param {object} user - The current logged in user
*/

@connect( store => {
  return {
    user: store.user
  }
})
class UserShow extends React.Component {
  render () {
    const {
      user,
      match
    } = this.props

    return (
      <main className="grid-wrap around top">
        <section className="col-3 col-sm-4 col-xs-12">
          <ul id="user-options" className="box">
            <h4>Mis Pedidos</h4>
            <li>
              <Link to={`${match.url}/orders`}>Historial de Pedidos</Link>
            </li>

            <h4>Mis detalles</h4>
            <li>
              <Link to={`${match.url}/details`}>Detalles</Link>
            </li>

            <li>
              <Link to={`${match.url}/addresses`}>Directorio</Link>
            </li>

            <li>
              <Link to={`${match.url}/codes`}>Códigos de Descuento</Link>
            </li>

            {user.get('isAdmin') &&
              <li>
                <Link to="/backoffice/orders">Backoffice</Link>
              </li>
            }

            <h4>Privacidad</h4>
            <li>
              <Link to="/terminosCondiciones">Política de Privacidad</Link>
            </li>
          </ul>
        </section>

        <Redirect from={`${match.url}/`} to={`${match.url}/details`}/>
        <Route path={`${match.url}/details`} component={UserDetails}/>
        <Route path={`${match.url}/orders`} component={UserOrders}/>
        <Route path={`${match.url}/addresses`} component={UserAddresses}/>
        <Route path={`${match.url}/codes`} component={UserCodes}/>
      </main>
    )
  }
}

export default UserShow;
