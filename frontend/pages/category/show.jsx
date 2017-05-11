import React from 'react'
import Results from 'components/Results/Results'


export default class CategoryShow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <main>
        <div className="category-cover"  style={{backgroundImage: 'url(http://placehold.it/852x300)'}}>
          <h2>Category</h2>
        </div>
        <Results/>
      </main>
    )
  }
}
