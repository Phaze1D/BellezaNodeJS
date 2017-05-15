import React, { PropTypes } from 'react'
import DiscountForm from 'components/DiscountForm/DiscountForm'


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

class CodesNew extends React.Component {
  render () {

    return (
      <DiscountForm/>
    )
  }
}

export default CodesNew;
