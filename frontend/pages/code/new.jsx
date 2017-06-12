import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getClient, resetClient } from 'actions/clients'
import { codeNew } from 'actions/discountcode'
import { resetErrors } from 'actions/errors'
import Loader from 'components/Loader/Loader'



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
    this.handleSuccess = this.handleSuccess.bind(this)
  }

  componentDidMount() {
    let id = this.props.match.params.user_id
    this.props.dispatch(getClient(id, this.props.user.get('token')))
    .then()
    .catch(this.handleError)
  }

  componentWillUnmount() {
    this.props.dispatch(resetClient())
    this.props.dispatch(resetErrors())
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.dispatch(resetErrors())
    let elements = event.target.elements
    let formData = new FormData()
    formData.append('code', elements.code.value)
    formData.append('discount', Number(elements.discount.value))
    formData.append('expires_date', elements.expires_date.value)
    this.props.dispatch(codeNew(formData, this.props.client.get('id'), this.props.user.get('token')))
    .then(this.handleSuccess)
    .catch(this.handleError)
  }

  handleSuccess(response){
    this.props.history.push({
      pathname: `/user/${this.props.client.get('id')}/codes`,
    })
  }

  handleError(response) {

  }

  render () {
    const {
      client,
      user,
      errors
    } = this.props

    if(!client.get('email')){
      return <Loader></Loader>
    }

    return (
      <div>
        <h2><span className="sub-text">Discount Code For:</span> {client.get('first_name')} {client.get('last_name')}</h2>
        <h4><span className="sub-text">Email:</span> {client.get('email')}</h4>

        <form className="main-form grid-wrap center" onSubmit={this.handleSubmit}>
          <div className="col-6">
            <label>Discount Code</label>
            {errors.get('code') && <div className="error-div">{errors.get('code')}</div>}
            <input type="text" name="code"/>
          </div>
          <div className="col-6"></div>

          <div className="col-4">
            <label>Discount Amount</label>
            {errors.get('discount') && <div className="error-div">{errors.get('discount')}</div>}
            <input type="number" name="discount" min='0' max='90'/>
          </div>

          <div className="col-6"></div>
          <div className="col-6">
            <label>Expires</label>
            {errors.get('expires_date') && <div className="error-div">{errors.get('expires_date')}</div>}
            <input type="date" name="expires_date"/>
          </div>

          <div className="col-6"></div>
          <Loader>
            <div className="col-6">
              <input className="submit full" type="submit" value="Send"/>
              <Link className="cancel full" to="/backoffice/users">Cancel</Link>
            </div>
          </Loader>

        </form>
      </div>
    )
  }
}

export default CodesNew;
