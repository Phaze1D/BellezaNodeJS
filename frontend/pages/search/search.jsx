import React from 'react'
import Results from 'components/Results/Results'
import { connect } from 'react-redux'
import { getProducts, resetProducts } from 'actions/product'
import queryString from 'query-string'


@connect( store => {
	return {
		products: store.products
	}
})
class Search extends React.Component {
	constructor(props){
		super(props)

		this.handleUrlChanged = this.handleUrlChanged.bind(this)
		this.handleError = this.handleError.bind(this)
		this.unlisten = null
	}

	componentDidMount() {
		this.handleUrlChanged(this.props.history.location)
		this.unlisten = this.props.history.listen(this.handleUrlChanged)
	}

	componentWillUnmount() {
		this.unlisten()
		this.props.dispatch(resetProducts())
	}

	handleUrlChanged(location) {
		if(this.props.match.url === location.pathname){
			const parse = queryString.parse(location.search)
			this.props.dispatch(getProducts(parse.q, undefined, parse.page, parse.sort))
				.then()
				.catch(this.handleError)
		}
	}

	handleError(response) {

	}

	render () {
		const {
			products,
			history,
			match,
			dispatch
		} = this.props

		const parse = queryString.parse(history.location.search)
		return (
			<main>
				<p className='search-label'>Resultados para:
          "<i><span className='sub-text light'>{parse.q}</span></i>"
				</p>
				<Results
					products={products.get('rows')}
					total={products.get('count')}
					url={`${match.url}?q=${parse.q}&`}
					page={parse.page}
					sort={parse.sort}
					dispatch={dispatch}/>
			</main>
		)
	}
}

export default Search
