import React from 'react'
import Results from 'components/Results/Results'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProducts, resetProducts } from 'actions/product'
import queryString from 'query-string'




/**
* LOCAL - GET
* @param {object} category - A object with a category information
*
* HTTP - GET
* @param {array} products - An array of products
*
* LOCAL - POST (on unmount)
* @param {array} reset - An empty array to reset products array
*/

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
    this.handleGlobalError = this.handleGlobalError.bind(this)
    this.unlisten = null
  }

  componentDidMount() {
    this.handleUrlChanged(this.props.history.location, this.props.history.action)
    this.unlisten = this.props.history.listen(this.handleUrlChanged)
  }

  componentDidUpdate(prevProps, prevState){
    let oldParams = prevProps.match.params
    let newParams = this.props.match.params

    if(newParams.index !== oldParams.index || newParams.sub !== oldParams.sub || newParams.show !== oldParams.show){
      this.handleUrlChanged(this.props.history.location, this.props.history.action)
    }
  }

  componentWillUnmount() {
    this.unlisten()
    this.props.dispatch(resetProducts())
  }

  handleUrlChanged(location, action) {
    let mParams = this.props.match.params
    let category = this.props.categories.get(mParams.index)
    category = category ? category.getIn(['subs', mParams.sub]) : false
    category = category ? category.getIn(['subs', mParams.show]) : false

    if((this.props.match.url === location.pathname) && category){
      const parse = queryString.parse(location.search)
      this.props.dispatch(getProducts(undefined, category.get('id'), parse.page, parse.sort))
      .then()
      .catch(this.handleGlobalError)
    }
  }

  handleGlobalError(response) {

  }

  render() {
    const {
      products,
      categories,
      match,
      dispatch
    } = this.props

    let category = categories.get(match.params.index)
    if(!category) return (<Redirect to="/home"/>)
    category = category.getIn(['subs', match.params.sub])
    if(!category) return (<Redirect to="/home"/>)
    category = category.getIn(['subs', match.params.show])
    if(!category) return (<Redirect to="/home"/>)

    return (
      <main>
        <div className="category-cover"  style={{backgroundImage: `url(https://s3-us-west-1.amazonaws.com/belleza-node/categories/${category.get('id')}.jpg)`}}>
          <h2>{category.get('name')}</h2>
        </div>
        <Results
          products={products.get('rows')}
          total={products.get('count')}
          url={`${match.url}?`}
          dispatch={dispatch}/>
      </main>
    )
  }
}
