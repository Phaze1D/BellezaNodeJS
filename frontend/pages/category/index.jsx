import React from 'react'
import { Link } from 'react-router-dom'

import {category} from '../../../fake'
const cate = category();

export default class CategoryIndex extends React.Component {
  constructor(props){
    super(props)
  }

  render(){

    const sideList = cate.mains.map( (cat, index) =>
      <li key={index}>
        <Link to={cat.to}>{cat.name}</Link>
      </li>
    )

    const gridList = cate.mains.map( (cat, index) =>
      <div className="categ__cell" key={index}>
        <Link to={cat.to} className="categ__item" style={{backgroundImage: 'url(http://placehold.it/300x125)'}}>
          <h3>{cat.name}</h3>
        </Link>
      </div>
    )

    return (
      <main className="categ__main">
        <section className="categ__section side">
          <h3 className="categ__ul-title">{cate.name}</h3>
          <ul className="categ__sidelist">
            {sideList}
          </ul>
        </section>

        <section className="categ__section main">
          <div className="categ__header-img" style={{backgroundImage: 'url(http://placehold.it/852x300)'}}>
            <h2>{cate.name}</h2>
          </div>

          <div className="categ__grid">
            {gridList}
          </div>

        </section>
      </main>
    )
  }
}
