import React from "react"
import BannerForm from "components/BannerForm/BannerForm"
import { connect } from "react-redux"
import { newBanner } from "actions/others"
import { resetErrors } from "actions/errors"


@connect(store => {
	return {
		banner: store.others.get("banner"),
		errors: store.errors,
		user: store.user
	}
})
class BannersNew extends React.Component {
	constructor(props){
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSucces = this.handleSucces.bind(this)
		this.handleError = this.handleError.bind(this)
	}

	componentWillUnmount() {
		this.props.dispatch(resetErrors())
	}

	handleSubmit(event) {
		this.props.dispatch(resetErrors())
		event.preventDefault()
		var formData = new FormData()
		var elements = event.target.elements
		formData.append("manual_active", elements.manual_active.checked)
		formData.append("start_date", elements.start_date.value)
		formData.append("end_date", elements.end_date.value)
		formData.append("link_to", elements.link_to.value)
		formData.append("imagelg", elements.imagelg.files[0])
		formData.append("imagesm", elements.imagesm.files[0])
		this.props.dispatch(newBanner(formData, this.props.user.get("token")))
			.then(this.handleSucces)
			.catch(this.handleError)
	}

	handleSucces(response){
		this.props.history.push({
			pathname: "/backoffice/banners"
		})
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

export default BannersNew
