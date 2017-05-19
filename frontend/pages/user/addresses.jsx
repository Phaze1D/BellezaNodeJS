import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AddressList from 'components/AddressList/AddressList'
import { userLogout } from 'actions/user'

// REMEMBER TO RESET ERRORS ON CANCEL

@connect( store => {
  return {
    user: store.user,
    errors: store.errors
  }
})
class UserAddresses extends React.Component {
  constructor(props){
    super(props)
    this.state = {showForm: false}

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(event){
    event.preventDefault()
    this.props.dispatch(userLogout())
  }

  render () {
    const addresses = this.props.user.get('addresses')
    const errors = this.props.errors

    return (
      <section className="col-9 col-sm-8 col-xs-11">
        <h2>
          Mi Directorio
          <Link to="#" className="sub-text light" style={{float: 'right'}}
            onClick={this.handleLogout}>Salir</Link>
        </h2>

        <AddressList
          selectable={false}
          addresses={addresses}
          dispatch={this.props.dispatch}
          errors={errors}/>

      </section>
    )
  }
}

export default UserAddresses;
