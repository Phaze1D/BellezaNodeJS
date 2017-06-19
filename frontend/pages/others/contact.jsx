import React from "react"
import { connect } from "react-redux"
import { resetErrors } from "actions/errors"
import {
	contact,
	validateContact,
} from "actions/others"



@connect( store => {
	return {
		others: store.others,
		errors: store.errors
	}
})
class Contact extends React.Component {
	constructor(props){
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputBlur = this.handleInputBlur.bind(this)
		this.handleInputFocus = this.handleInputFocus.bind(this)
		this.handleError = this.handleError.bind(this)
	}

	handleSubmit(event){
		event.preventDefault()
		let elements = event.target.elements
		let formData = new FormData()
		formData.append("email", elements.email.value)
		formData.append("name", elements.name.value)
		formData.append("question", elements.question.value)

		this.props.dispatch(contact(formData))
			.then()
			.catch(this.handleError)
	}

	handleInputBlur(event){
		let fieldData = new FormData()
		fieldData.append(event.target.name, event.target.value)

		this.props.dispatch(validateContact(fieldData))
			.then()
			.catch(this.handleError)
	}

	handleInputFocus(event){
		this.props.dispatch(resetErrors(event.target.name))
	}

	handleError(response){

	}

	render () {
		const errors = this.props.errors

		return (
			<main>
				<h2>Contáctanos</h2>
				<form
					className="main-form"
					style={{maxWidth: "400px", width: "100%"}}
					onSubmit={this.handleSubmit}>

					<label htmlFor="name">Nombre</label>
					{errors.get("name") && <div className="error-div">{errors.get("name")}</div>}
					<input type="text" name="name"
						onBlur={this.handleInputBlur}
						onFocus={this.handleInputFocus}/>

					<label htmlFor="email">Email</label>
					{errors.get("email") && <div className="error-div">{errors.get("email")}</div>}
					<input type="text" name="email"
						onBlur={this.handleInputBlur}
						onFocus={this.handleInputFocus}/>

					<label htmlFor="question">Pregunta</label>
					{errors.get("question") && <div className="error-div">{errors.get("question")}</div>}
					<textarea name="question" className="input" rows="5" cols="40"
						onBlur={this.handleInputBlur}
						onFocus={this.handleInputFocus}></textarea>

					<input className="submit full" type="submit" value="Enviar"/>
				</form>
			</main>
		)
	}
}

export default Contact
