import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { resetErrors } from 'actions/errors'



@connect( store => {
	return {
		global: store.errors.get('global')
	}
})
export default class GlobalError extends React.Component {
	constructor(props) {
		super(props)
		this.state = {show: false}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.global.get('status')){
			this.setState({show: true})

			setTimeout(() => {
				this.setState({show: false})
				this.props.dispatch(resetErrors())
			},  2000)
		}
	}

	render(){
		const {
			global
		} = this.props

		const errClasses = classnames({'show': this.state.show})

		return (
			<div id='error-box' className={errClasses}>
				<h3>Error {global.get('status')}</h3>
				<p>{global.get('message')}</p>
			</div>
		)
	}
}
