import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

class DiscountForm extends React.Component {
  render () {
    return (
      <div>
        <h2>Discount Code For: {this.props.firstName} {this.props.lastName}</h2>
        <h4>Email: {this.props.email}</h4>

        <form className="main-form grid-wrap center">
          <div className="col-6">
            <label>DiscountCode</label>
            <input type="text" name="code"/>
          </div>
          <div className="col-6"></div>

          <div className="col-4">
            <label>Discount Amount</label>
            <input type="text" name="amount"/>
          </div>

          <div className="col-2">
            <label>Percentage</label>
            <input type="checkbox" name="type"/>
          </div>

          <div className="col-6"></div>
          <div className="col-6">
            <label>Expires (YYYY-MM-DD)</label>
            <input type="date" name="expires"/>
          </div>

          <div className="col-6"></div>
          <input className="submit col-6" type="submit" value="Send"/>
          <div className="col-6"></div>
          <Link className="cancel col-6" to="/backoffice/users/index">Cancel</Link>
        </form>
      </div>
    )
  }
}

export default DiscountForm;
