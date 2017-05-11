import React, { PropTypes } from 'react'
import Results from 'components/Results/Results'

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
