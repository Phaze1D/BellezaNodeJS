import React, { PropTypes } from 'react'
import Results from 'components/Results/Results'

/**
* HTTP - GET
* @param {array} products - results of the search input
*
* LOCAL - POST (on unmount)
* @param {array} reset - An empty array to reset products array
*/

class Search extends React.Component {
  render () {

    return (
      <main>
        <p className="search-label">Resultados para:
          "<i><span className="sub-text light">search value</span></i>"
        </p>
        <Results/>
      </main>
    )
  }
}

export default Search;
