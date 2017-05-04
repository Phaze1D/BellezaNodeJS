import React from 'react'
import Results from 'components/Results/Results'


export default class Category extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div>
        <div style={{padding: '0 24px'}}>
          <div className="categ__header-img"  style={{backgroundImage: 'url(http://placehold.it/852x300)'}}>
            <h2>Category</h2>
          </div>
        </div>
        <Results/>
      </div>
    )
  }
}
