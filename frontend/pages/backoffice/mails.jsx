import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination/Pagination'
import { connect } from 'react-redux'
import { resetMailing, getMailing } from 'actions/others'
import queryString from 'query-string'


/**
* HTTP - GET
* @param {array} mails - An array of mails
*
* LOCAL - POST (on unmount)
* @param {array} reset - An empty array to mails array
*/

@connect(store => {
  return {
    mailing: store.others.get('mailing'),
    user: store.user
  }
})
class BackofficeMails extends React.Component {
  constructor(props){
    super(props)
    this.state = {page: 0, prePage: 20}

    this.handleUrlChanged = this.handleUrlChanged.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
    this.handleError = this.handleError.bind(this)
    this.unlisten = null
  }

  componentDidMount() {
    this.handleUrlChanged(this.props.history.location, this.props.history.action)
    this.unlisten = this.props.history.listen(this.handleUrlChanged)
  }

  componentWillUnmount() {
    this.unlisten()
    this.props.dispatch(resetMailing())
  }

  handleUrlChanged(location, action) {
    if(this.props.match.url === location.pathname){
      const parse = queryString.parse(location.search)

      this.props.dispatch(getMailing(parse.page, this.props.user.get('token')))
      .then()
      .catch(this.handleError)
    }
  }

  handlePageClick(index, event){
    this.setState({page: index})
  }

  handleError(response) {

  }
  render () {
    const {
      mailing,
      user,
      match,
      history
    } = this.props

    const emailList = mailing.get('rows').map((mail, index) =>
      <tr key={index}>
        <td>{mail.email}</td>
      </tr>
    )

    const parse = queryString.parse(history.location.search)
    const links = []
    for(let i = 0; i < Math.ceil(mailing.get('count')/this.state.prePage); i++ ){
      links.push({value: `${match.url}?page=${i}`, name: i+1})
    }

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
