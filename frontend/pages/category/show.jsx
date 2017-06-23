import React from "react"
import Results from "components/Results/Results"
import { Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { getProducts, resetProducts } from "actions/product"
import queryString from "query-string"


@connect( store => {
	return {
		categories: store.categories,
		products: store.products
	}
})
export default class CategoryShow extends React.Component {
	constructor(props) {
		super(props)

		this.handleUrlChanged = this.handleUrlChanged.bind(this)
		this.handleError = this.handleError.bind(this)
		this.unlisten = null
	}

	componentDidMount() {
		this.handleUrlChanged(this.props.history.location)
		this.unlisten = this.props.history.listen(this.handleUrlChanged)
	}

	componentDidUpdate(prevProps, prevState){
		let oldParams = prevProps.match.params
		let newParams = this.props.match.params

		if(newParams.index !== oldParams.index || newParams.sub !== oldParams.sub || newParams.show !== oldParams.show){
			this.props.dispatch(resetProducts())
			this.handleUrlChanged(this.props.history.location)
		}
	}

	componentWillUnmount() {
		this.unlisten()
		this.props.dispatch(resetProducts())
	}

	handleUrlChanged(location) {
		let mParams = this.props.match.params
		let category = this.props.categories.get(mParams.index)
		category = category ? category.getIn(["subs", mParams.sub]) : false
		category = category ? category.getIn(["subs", mParams.show]) : false

		if((this.props.match.url === location.pathname) && category){
			const parse = queryString.parse(location.search)
			this.props.dispatch(getProducts(undefined, category.get("id"), parse.page, parse.sort))
				.then()
				.catch(this.handleError)
		}
	}

	handleError(response) {

	}

	render() {
		const {
			products,
			categories,
			match,
			dispatch,
			history
		} = this.props

		let category = categories.get(match.params.index)
		if(!category) return (<Redirect to="/"/>)
		category = category.getIn(["subs", match.params.sub])
		if(!category) return (<Redirect to="/"/>)
		category = category.getIn(["subs", match.params.show])
		if(!category) return (<Redirect to="/"/>)

		const parse = queryString.parse(history.location.search)
		return (
			<main>
				<div className="category-cover"  style={{backgroundImage: `url(https://s3-us-west-1.amazonaws.com/belleza-node/categories/${category.get("id")}.jpg)`}}>
					<h2>{category.get("name")}</h2>
				</div>
				<Results
					products={products.get("rows")}
					total={products.get("count")}
					url={`${match.url}?`}
					page={parse.page}
					sort={parse.sort}
					dispatch={dispatch}/>
			</main>
		)
	}
}
