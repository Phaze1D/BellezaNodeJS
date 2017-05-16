import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


/**
* LOCAL - GET
* @param {object} category - A object with a category information and its sub categories
*
*/

@connect( store => {
  return {
    categories: store.categories,
  }
})
export default class CategoryIndex extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const {
      categories,
      match
    } = this.props

    let category = categories[match.params.index]
    if(!category) return (<Redirect to="/home"/>)
    category = match.params.sub ? category.subs[match.params.sub] : category
    if(!category) return (<Redirect to="/home"/>)

    const sideList = category.subs.map( (sub, index) =>
      <li key={index}>
        <Link to={sub.to}>{sub.name}</Link>
      </li>
    )

    const gridList = category.subs.map( (sub, index) =>
      <div className="col-4 col-sm-6 col-xxs-12" key={index}>
        <Link to={sub.to} className="category-item" style={{backgroundImage: 'url(http://placehold.it/300x125)'}}>
          <h3 className="highlight">{sub.name}</h3>
        </Link>
      </div>
    )

    return (
      <main className="grid">
        <section className="col-3 col-xs-hide">
          <h3>{category.name}</h3>
          <ul className="ul-dots">
            {sideList}
          </ul>
        </section>

        <section className="col-9 col-xs-12">
          <div className="category-cover" style={{backgroundImage: 'url(http://placehold.it/852x300)'}}>
            <h2>{category.name}</h2>
          </div>

          <div className="grid-wrap">
            {gridList}
          </div>

        </section>
      </main>
    )
  }
}
