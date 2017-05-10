import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

class DiscountForm extends React.Component {
  render () {
    return (
      <div>
        <h2>Discount Code For: {this.props.firstName} {this.props.lastName}</h2>
        <h4>Email: {this.props.email}</h4>

        <form className="green-form">
          <label>DiscountCode</label>
          <input type="text" name="code" className="input"/>

          <label>Percentage</label>
          <input type="checkbox" name="type"/>

          <label>Discount Amount</label>
          <input type="text" name="amount" className="input"/>

          <label>Expires (YYYY-MM-DD)</label>
          <input type="date" name="expires" className="input"/>

          <input type="submit" value="Send" className="submit"/>
          <Link to="/backoffice/users/index" className="cancel" >Cancel</Link>
        </form>
      </div>
    )
  }
}

export default DiscountForm;
