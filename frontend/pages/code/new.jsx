import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getClient, resetClient } from 'actions/clients'
import { codeNew } from 'actions/discountcode'
import { resetErrors } from 'actions/errors'



/**
* HTTP - POST
* @param {object} code - The new discount code to add
*
* LOCAL - POST
* @param {string} resetOne - A string to reset one property of the error object
*
* LOCAL - POST (on unmount)
* @param {object} resetAll - An empty object to reset errors
*/

@connect(store => {
  return {
    client: store.client,
    user: store.user,
    errors: store.errors
  }
})
class CodesNew extends React.Component {
  constructor(props){
    super(props)

    this.handleError = this.handleError.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    let id = this.props.match.params.user_id
    this.props.dispatch(getClient(id))
    .then()
    .catch(this.handleError)
  }

  componentWillUnmount() {
    this.props.dispatch(resetClient())
    this.props.dispatch(resetErrors())
  }

  handleSubmit(event) {
    event.preventDefault()
    let elements = event.target.elements
    let formData = new FormData()
    formData.append('code', elements.code.value)
    formData.append('amount', elements.amount.value)
    formData.append('type', elements.type.checked)
    formData.append('expires', elements.expires.value)

    this.props.dispatch(codeNew(formData))
    .then()
    .catch(this.handleError)
  }

  handleError(response) {

  }

  render () {
    const {
      client,
      user,
      errors
    } = this.props

    return (
      <div>
        <h2>Discount Code For: {client.get('first_name')} {client.get('last_name')}</h2>
        <h4>Email: {client.get('email')}</h4>

        <form className="main-form grid-wrap center" onSubmit={this.handleSubmit}>
          <div className="col-6">
            <label>Discount Code</label>
            {errors.get('code') && <div className="error-div">{errors.get('code')}</div>}
            <input type="text" name="code"/>
          </div>
          <div className="col-6"></div>

          <div className="col-4">
            <label>Discount Amount</label>
            {errors.get('amount') && <div className="error-div">{errors.get('amount')}</div>}
            <input type="text" name="amount"/>
          </div>

          <div className="col-2">
            <label>Percentage</label>
            {errors.get('type') && <div className="error-div">{errors.get('type')}</div>}
            <input type="checkbox" name="type"/>
          </div>

          <div className="col-6"></div>
          <div className="col-6">
            <label>Expires</label>
            {errors.get('expires') && <div className="error-div">{errors.get('expires')}</div>}
            <input type="date" name="expires"/>
          </div>

          <div className="col-6"></div>
          <input className="submit col-6" type="submit" value="Send"/>
          <div className="col-6"></div>
          <Link className="cancel col-6" to="/backoffice/users">Cancel</Link>
        </form>
      </div>
    )
  }
}

export default CodesNew;
