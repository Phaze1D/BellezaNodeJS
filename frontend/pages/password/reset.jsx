import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { passwordReset } from 'actions/others'
import { resetErrors } from 'actions/errors'
import Loader from 'components/Loader/Loader'


@connect( store => {
	return {
		errors: store.errors
	}
})
class PasswordReset extends React.Component {
	constructor(props){
		super(props)
		this.state = {showSuccess: false}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputFocus = this.handleInputFocus.bind(this)
		this.handleSuccess = this.handleSuccess.bind(this)
		this.handleError = this.handleError.bind(this)
	}

	componentWillUnmount() {
		this.props.dispatch(resetErrors())
	}

	handleSubmit(event){
		event.preventDefault()
		let elements = event.target.elements
		let formData = new FormData()
		formData.append('email', elements.email.value)
		formData.append('password', elements.password.value)
		this.props.dispatch(resetErrors())
		this.props.dispatch(passwordReset(formData, this.props.match.params.token))
			.then(this.handleSuccess)
			.catch(this.handleError)
	}

	handleInputFocus(event){
		event.target.value=''
		this.props.dispatch(resetErrors(event.target.name))
	}

	handleSuccess(response){
		this.setState({showSuccess: true})
	}

	handleError(response){

	}

	render () {
		const {
			errors,
			user
		} = this.props

		if(user.get('token')){
			return <Redirect to={`/user/${user.get('id')}`}/>
		}

		return (
			<main>
				<h2>Restablecer la Contraseña</h2>
				<Loader>
					<form className="main-form" style={{width: '100%', maxWidth: '400px'}} onSubmit={this.handleSubmit} autoComplete="nope">
						<input name="femail" type="text" style={{display: 'none'}}/>
						<input name="fpassword" type="password" style={{display: 'none'}}/>

						<label htmlFor="email">Email</label>
						<input name="email" type="text" onFocus={this.handleInputFocus}
							autoComplete="nope"
							defaultValue=" "/>

						<label htmlFor="password">Password</label>
						{errors.get('password') && <div className="error-div">{errors.get('password')}</div>}
						<input name="password" type="password" onFocus={this.handleInputFocus} autoComplete="nope"/>


						<input  className="submit full"  type="submit" value="Enviar"/>
						{errors.get('token') && <div className="error-div">{errors.get('token')}</div>}
					</form>
				</Loader>
			</main>
		)
	}
}

export default PasswordReset
