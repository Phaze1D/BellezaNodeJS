import React from 'react'
import { Link } from 'react-router-dom'
import DropDown from 'components/DropDown/DropDown'
import Pagination from 'components/Pagination/Pagination'
import ProductResult from 'components/ProductResult/ProductResult'
import Loader from 'components/Loader/Loader'



export default class Results extends React.Component {
  constructor(props) {
    super(props)
    this.state = {page: 0, prePage: 20, sortIndex: 0}

    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handlePageClick(index, event){
    this.setState({page: index})
  }

  handleSort(index){
    this.setState({sortIndex: index, page: 0})
  }

  render() {
    const {
      products,
      total,
      url,
      dispatch
    } = this.props

    const links = []
    for(let i = 0; i < Math.ceil(total/this.state.prePage); i++ ){
      links.push({value: `${url}page=${i}&sort=${this.state.sortIndex}`, name: i+1})
    }

    const prodList = products.map( (product, index) =>
      <ProductResult
        key={index}
        product={product}
        dispatch={dispatch}/>
    )

    return (
      <section>
        <div className="grid-wrap between results-options center">
          <div className="grid center">
            <span className="col-xxs-hide" style={{marginRight: '16px'}}>Ordenar por:</span>
            <DropDown
              url={url}
              focuson={this.state.sortIndex}
              onRequestItem={this.handleSort}/>
          </div>

          <Pagination
            links={links}
            page={this.state.page}
            onRequestClick={this.handlePageClick}/>
        </div>

        <Loader>
          <div className="grid-wrap">
            {prodList}
          </div>
        </Loader>
        
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
