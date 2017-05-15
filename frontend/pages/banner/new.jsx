import React, { PropTypes } from 'react'
import BannerForm from 'components/BannerForm/BannerForm'


/**
* HTTP - POST
* @param {object} banner - The new banner to add
*
* LOCAL - POST
* @param {string} resetOne - A string to reset one property of the error object
*
* LOCAL - POST (on unmount)
* @param {object} resetAll - An empty object to reset errors
*/


class BannersNew extends React.Component {
  render () {

    return (
      <BannerForm/>
    )
  }
}

export default BannersNew;
