import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import AddressList from 'components/AddressList/AddressList'

import {user} from '../../../fake.js'

const us = user()

class UserAddresses extends React.Component {
  render () {
    return (
      <section className="user__section smooth">
        <h2>
          Mi Directorio
          <Link to="#">Salir</Link>
        </h2>

        <AddressList selectable={false}/>

      </section>
    )
  }
}

export default UserAddresses;
