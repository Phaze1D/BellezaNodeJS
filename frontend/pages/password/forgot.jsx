import React from 'react'
import { connect } from 'react-redux'
import { passwordForgot } from 'actions/others'
import { resetErrors } from 'actions/errors'
import Loader from 'components/Loader/Loader'


@connect( store => {
	return {
		others: store.others,
		errors: store.errors
	}
})
class PasswordForgot extends React.Component {
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
		this.email = elements.email.value

		this.props.dispatch(passwordForgot(formData))
			.then(this.handleSuccess)
			.catch(this.handleError)
	}

	handleInputFocus(event){
		this.props.dispatch(resetErrors(event.target.name))
	}

	handleSuccess(response){
		this.setState({showSuccess: true})
	}

	handleError(response){

	}

	render () {
		const errors = this.props.errors

		return (
			<main>
				<h2>¿Olvidaste Tu Contraseña?</h2>
				<p className='sub'>
					Proporcione a su cuenta de correo electrónico para recibir un correo electrónico para restablecer su contraseña
				</p>

				{this.state.showSuccess ?
					<h3 style={{color: '#1eab30'}}>
            Le hemos enviado un correo electrónico a
						<span className='sub-text primary'> {this.email} </span>
            con las instrucciones de cómo restablecer su contraseña
					</h3>
					:
					<Loader>
						<form className='main-form' style={{width: '100%', maxWidth: '400px'}} onSubmit={this.handleSubmit}>
							<label htmlFor='email'>Email</label>
							{errors.get('email') && <div className='error-div'>{errors.get('email')}</div>}
							<input name='email' type='text' onFocus={this.handleInputFocus} autoComplete='off'/>
							<input  className='submit full'  type='submit' value='Enviar'/>
						</form>
					</Loader>
				}
			</main>
		)
	}
}

export default PasswordForgot
