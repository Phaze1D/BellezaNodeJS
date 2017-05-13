import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination/Pagination'

const usr = []
const links = [];
for (var i = 0; i < 12; i++) links.push({value: "#", name: i+1})

class BackofficeMails extends React.Component {
  constructor(props){
    super(props)
    this.state = {page: 0}
  }

  render () {

    const emailList = usr.map((user, index) =>
      <tr key={index}>
        <td>{user.email}</td>
      </tr>
    )

    return (
      <div>
        <div className="protop">
          <Link to ="#" className="white-button">Download</Link>
        </div>

        <table className="backoffice-table">
          <thead>
            <tr>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {emailList}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="1">
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

export default BackofficeMails;
