import React, { PropTypes } from 'react'
import BannerForm from 'components/BannerForm/BannerForm'


/**
* LOCAL - GET
* @param {object} banner - The full banner info to edit
*
* HTTP - POST
* @param {object} banner - The edited banner to add
*
* LOCAL - POST
* @param {string} resetOne - A string to reset one property of the error object
*
* LOCAL - POST (on unmount)
* @param {object} resetAll - An empty object to reset errors
*/

class BannersEdit extends React.Component {
  render () {

    return (
      <BannerForm/>
    )
  }
}

export default BannersEdit;
