import React, { PropTypes } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import UserDetails from 'pages/user/details'
import UserOrders from 'pages/user/orders'
import UserAddresses from 'pages/user/addresses'
import UserCodes from 'pages/user/codes'

class UserShow extends React.Component {
  render () {
    const match = this.props.match

    return (
      <main className="grid around top">
        <section className="col-3">
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

            <li>
              <Link to="/backoffice/orders">Backoffice</Link>
            </li>

            <h4>Privacidad</h4>
            <li>
              <Link to="/terminosCondiciones">Política de Privacidad</Link>
            </li>
          </ul>
        </section>

        <Route path={`${match.url}/details`} component={UserDetails}/>
        <Route path={`${match.url}/orders`} component={UserOrders}/>
        <Route path={`${match.url}/addresses`} component={UserAddresses}/>
        <Route path={`${match.url}/codes`} component={UserCodes}/>
      </main>
    )
  }
}

export default UserShow;
