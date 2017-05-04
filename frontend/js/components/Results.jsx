import React from 'react'
import { Link } from 'react-router-dom'
import DropDown from 'js/components/DropDown'
import Pagination from 'js/components/Pagination'
import ProductResult from 'js/components/ProductResult'

import { products } from '../../../fake'

const prod = products(20)

const links = [];
for (var i = 0; i < 12; i++) links.push({value: "#", name: i+1})


export default class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {selectedIndex: 0}

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(index, event){
    this.setState({selectedIndex: index})
  }

  render() {
    const sortOptions = ["A-Z", "Z-A", "Precio Alto", "Precio Bajo"]

    const prodList = prod.map( (product, index) =>
      <ProductResult key={index} {...product}/>
    )

    return (
      <section>
        <div className="results__options">
          Ordenar por:
          <DropDown options={sortOptions}/>

          <Pagination
            links={links}
            selectedIndex={this.state.selectedIndex}
            onRequestClick={this.handlePageClick}/>
        </div>

        <div className="results__grid">
          {prodList}
        </div>

        {links.length > 1 &&
          <div className="results__options">
            <Pagination
              links={links}
              selectedIndex={this.state.selectedIndex}
              onRequestClick={this.handlePageClick}/>
          </div>
        }
      </section>
    )
  }
}
