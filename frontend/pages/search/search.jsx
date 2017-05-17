import React, { PropTypes } from 'react'
import Results from 'components/Results/Results'
import { connect } from 'react-redux'
import { getProducts, resetProducts } from 'actions/product'
import queryString from 'query-string'

/**
* HTTP - GET
* @param {array} products - results of the search input
*
*/

@connect( store => {
  return {
    products: store.products
  }
})
class Search extends React.Component {
  constructor(props){
    super(props)

    this.handleUrlChanged = this.handleUrlChanged.bind(this)
    this.handleGlobalError = this.handleGlobalError.bind(this)
    this.unlisten = null
  }

  componentDidMount() {
    this.handleUrlChanged(this.props.history.location, this.props.history.action)
    this.unlisten = this.props.history.listen(this.handleUrlChanged)
  }

  componentWillUnmount() {
    this.unlisten()
    this.props.dispatch(resetProducts())
  }

  handleUrlChanged(location, action) {
    if(this.props.match.url === location.pathname){
      const parse = queryString.parse(location.search)
      this.props.dispatch(getProducts(parse.q, undefined, parse.page, parse.sort))
      .then()
      .catch(this.handleGlobalError)
    }
  }

  handleGlobalError(response) {

  }

  render () {
    const {
      products,
      history,
      match
    } = this.props

    const parse = queryString.parse(history.location.search)
    return (
      <main>
        <p className="search-label">Resultados para:
          "<i><span className="sub-text light">{parse.q}</span></i>"
        </p>
        <Results
          products={products.get('results')}
          total={products.get('total')}
          url={`${match.url}?q=${parse.q}&`}/>
      </main>
    )
  }
}

export default Search;
