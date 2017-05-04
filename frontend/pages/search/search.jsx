import React, { PropTypes } from 'react'
import Results from 'components/Results/Results'

class Search extends React.Component {
  render () {

    return (
      <div>
        <p className="search-label">Resultados para: "<i><span>search value</span></i>"</p>
        <Results/>
      </div>
    )
  }
}

export default Search;
