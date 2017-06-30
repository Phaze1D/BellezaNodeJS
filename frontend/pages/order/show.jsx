import React from 'react'
import { Redirect } from 'react-router-dom'
import OrderTable from 'components/OrderTable/OrderTable'
import { Address } from 'pages/checkout/confirmation'
import { dateOptions } from 'utils/date'
import { connect } from 'react-redux'
import { getOrder, resetOrder } from 'actions/order'
import Loader from 'components/Loader/Loader'


@connect( store => {
	return {
		order: store.order
	}
})
class OrderShow extends React.Component {
	constructor(props){
		super(props)

		this.handleError = this.handleError.bind(this)
	}

	componentDidMount() {
		let user_id = this.props.match.params.id
		let id = this.props.match.params.order_id
		this.props.dispatch(getOrder(id, user_id, this.props.user.get('token')))
			.then()
			.catch(this.handleError)
	}

	componentWillUnmount() {
		this.props.dispatch(resetOrder())
	}

	handleError(response) {

	}

	render () {
		const {
			order,
			user,
			match
		} = this.props

		if( !( user.get('token') && (user.get('id') == match.params.id || user.get('admin')) ) ){
			return <Redirect to='/home'/>
		}

		return (
			<Loader>
				<main>
					<h2 className={`status-${order.get('status')}`}>Status: {order.get('status')}</h2>
					<h4 className='sub-text'>Referencia: #{order.get('id')}</h4>
					<h4 className='sub-text'>
            Fecha Realizado: {new Date(order.get('created_at')).toLocaleString('en-us', dateOptions)}
					</h4>
					{order.get('notes') &&
						<h4 className='sub-text'>
							Notas: {order.get('notes')}
						</h4>
					}
					<div className='grid-wrap'>
						<div className='col-9 col-md-8 col-sm-12'>
							<OrderTable
								order={order}
								editable={false}/>
						</div>


						<div className='col-3 col-md-4 col-sm-12'>
							<Address address={order.get('shippingAddress')} title='Dirección de Envío'/>
							{order.get('invoiceAddress') != null && !order.get('invoiceAddress').isEmpty() &&
																<Address address={order.get('invoiceAddress')} title='Facturacion' rfc={order.get('rfc')} razonSocial={order.get('razon_social')}/>
							}
						</div>
					</div>
				</main>
			</Loader>
		)
	}
}

export default OrderShow
