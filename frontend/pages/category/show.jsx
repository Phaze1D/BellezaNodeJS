import React from 'react'
import Results from 'components/Results/Results'



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
