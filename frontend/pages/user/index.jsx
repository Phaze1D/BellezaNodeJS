import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination/Pagination'

const usr = []
const links = [];
for (var i = 0; i < 12; i++) links.push({value: "#", name: i+1})

export default class UsersIndex extends React.Component {
  constructor(props){
    super(props)
    this.state = {page: 0}
  }

  render () {

    const userList = usr.map( (user, index) =>
      <UserItem
        {...user}
        key={index}/>
    )

    return (
      <div>
        <div className="protop">
          <form>
            <input type="text" className="input" name="search"/>
          </form>
        </div>

        <table className="backoffice-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Total Amount</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {userList}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="7">
                <Pagination
                  links={links}
                  page={this.state.page}
                  onRequestClick={this.handlePageClick}/>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}


const UserItem = props => (
  <tr>
    <td>{props.firstName}</td>
    <td>{props.lastName}</td>
    <td>{props.email}</td>
    <td>${props.amount}</td>
    <td>
      <Link  to="/user/orders">Pedidos</Link>
    </td>
    <td>
      <Link  to="/backoffice/codes/new">Give Discount</Link>
    </td>
    <td>
      <Link  to="/user/codes">Show Discounts</Link>
    </td>
  </tr>
)
