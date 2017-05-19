import React, { PropTypes } from 'react'
import BannerForm from 'components/BannerForm/BannerForm'
import { connect } from 'react-redux'
import { editBanner, resetBanner, getBanner } from 'actions/others'


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

@connect(store => {
  return {
    banner: store.others.get('banner'),
    errors: store.errors
  }
})
class BannersEdit extends React.Component {
  constructor(props){
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleError = this.handleError.bind(this)
  }

  componentDidMount() {
    let id = this.props.match.params.id
    this.props.dispatch(getBanner(id))
    .then()
    .catch(this.handleError)
  }

  componentWillUnmount() {
    this.props.dispatch(resetBanner())
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handleError(response) {

  }

  render () {
    const {
      banner,
      errors
    } = this.props

    return (
      <BannerForm
        banner={banner}
        errors={errors}
        onRequestSubmit={this.handleSubmit}/>
    )
  }
}

export default BannersEdit;
