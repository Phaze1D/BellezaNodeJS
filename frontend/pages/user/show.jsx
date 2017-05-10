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
      <main className="user__wrapper">
        <section className="user__options">
          <ul className="user__options-list">
            <h4 className="smooth">Mis Pedidos</h4>
            <li>
              <Link to={`${match.url}/orders`}>Historial de Pedidos</Link>
            </li>

            <h4 className="smooth">Mis detalles</h4>
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

            <h4 className="smooth">Privacidad</h4>
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
