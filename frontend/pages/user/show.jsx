import React, { PropTypes } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import UserDetails from 'pages/user/details'
import UserOrders from 'pages/user/orders'
import UserAddresses from 'pages/user/addresses'
import UserCodes from 'pages/user/codes'

class UserShow extends React.Component {
  render () {

    return (
      <main className="user__wrapper">
        <section className="user__options">
          <ul className="user__options-list">
            <h4 className="smooth">Mis Pedidos</h4>
            <li>
              <Link to="/user/orders">Historial de Pedidos</Link>
            </li>

            <h4 className="smooth">Mis detalles</h4>
            <li>
              <Link to="/user/details">Detalles</Link>
            </li>

            <li>
              <Link to="/user/addresses">Directorio</Link>
            </li>

            <li>
              <Link to="/user/codes">Códigos de Descuento</Link>
            </li>

            <li>
              <Link to="#">Backoffice</Link>
            </li>

            <h4 className="smooth">Privacidad</h4>
            <li>
              <Link to="#">Política de Privacidad</Link>
            </li>
          </ul>
        </section>

        <Route path="/user/details" component={UserDetails}/>
        <Route path="/user/orders" component={UserOrders}/>
        <Route path="/user/addresses" component={UserAddresses}/>
        <Route path="/user/codes" component={UserCodes}/>
      </main>
    )
  }
}

export default UserShow;
