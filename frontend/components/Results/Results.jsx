import React from 'react'
import { Link } from 'react-router-dom'
import DropDown from 'components/DropDown/DropDown'
import Pagination from 'components/Pagination/Pagination'
import ProductResult from 'components/ProductResult/ProductResult'

import { products } from '../../../fake'

const prod = products(20)

const links = [];
for (var i = 0; i < 12; i++) links.push({value: "#", name: i+1})


export default class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {page: 0}

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick(index, event){
    this.setState({page: index})
  }

  render() {
    const sortOptions = ["A-Z", "Z-A", "Precio Alto", "Precio Bajo"]

    const prodList = prod.map( (product, index) =>
      <ProductResult key={index} {...product}/>
    )

    return (
      <section>
        <div className="grid between results-options center">
          <div className="grid center">
            Ordenar por:
            <DropDown options={sortOptions}/>
          </div>


          <Pagination
            links={links}
            page={this.state.page}
            onRequestClick={this.handlePageClick}/>
        </div>

        <div className="grid-wrap">
          {prodList}
        </div>

        {links.length > 1 &&
          <div className="grid between results-options center end">
            <Pagination
              links={links}
              page={this.state.page}
              onRequestClick={this.handlePageClick}/>
          </div>
        }
      </section>
    )
  }
}
