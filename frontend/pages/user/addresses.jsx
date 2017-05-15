import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import AddressList from 'components/AddressList/AddressList'

const us = {}

/**
* LOCAL - GET
* @param {array} addresses - An array of the current user addresses
*
* LOCAL - POST
* @param {object} resetLogout - Logouts the user by reseting it with empty object
*
*/

class UserAddresses extends React.Component {
  render () {
    return (
      <section className="col-9 col-sm-8 col-xs-11">
        <h2>
          Mi Directorio
          <Link to="#" className="sub-text light" style={{float: 'right'}}>Salir</Link>
        </h2>

        <AddressList selectable={false}/>

      </section>
    )
  }
}

export default UserAddresses;
