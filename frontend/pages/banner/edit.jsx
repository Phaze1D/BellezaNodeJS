import React from "react"
import BannerForm from "components/BannerForm/BannerForm"
import { connect } from "react-redux"
import { editBanner, resetBanner, getBanner } from "actions/others"
import { resetErrors } from "actions/errors"
import Loader from "components/Loader/Loader"


@connect(store => {
	return {
		banner: store.others.get("banner"),
		errors: store.errors,
		user: store.user
	}
})
class BannersEdit extends React.Component {
	constructor(props){
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleError = this.handleError.bind(this)
		this.handleSucces = this.handleSucces.bind(this)

	}

	componentDidMount() {
		let id = this.props.match.params.id
		this.props.dispatch(getBanner(id, this.props.user.get("token")))
			.then()
			.catch(this.handleError)
	}

	componentWillUnmount() {
		this.props.dispatch(resetBanner())
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
		this.props.dispatch(editBanner(formData, this.props.banner.get("id"), this.props.user.get("token")))
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

		if(banner.get("loading")){
			return <Loader></Loader>
		}

		return (
			<BannerForm
				banner={banner}
				errors={errors}
				onRequestSubmit={this.handleSubmit}/>
		)
	}
}

export default BannersEdit
