import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import AddressList from 'components/AddressList/AddressList'


const us = {}

class UserAddresses extends React.Component {
  render () {
    return (
      <section className="col-9">
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
