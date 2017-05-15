import React, { PropTypes } from 'react'
import { Link, Route } from 'react-router-dom'
import Pagination from 'components/Pagination/Pagination'

const prods = []
const links = [];
for (var i = 0; i < 12; i++) links.push({value: "#", name: i+1})

/**
* HTTP - GET
* @param {array} products - An array of products
*
* LOCAL - POST (on unmount)
* @param {array} reset - An empty array to reset products array
*/

export default class ProductsIndex extends React.Component {
  constructor(props){
    super(props)
    this.state = {page: 0}
  }

  render () {
    const match = this.props.match

    const productList = prods.map( (product, index) =>
      <ProductItem
        {...product}
        key={index}
        match={match}/>
    )

    return (
      <div>
        <div className="protop">
          <Link to={`/backoffice/products/new`} className="secondary-button">Add Product</Link>
          <form>
            <input type="text" name="search"/>
          </form>
        </div>
        <table className="backoffice-table">
          <thead>
            <tr>
              <th>PLU</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {productList}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="4">
                <Pagination
                  links={links}
                  page={this.state.page}
                  onRequestClick={this.handlePageClick}/>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

const ProductItem = props => (
  <tr>
    <td>{props.plu}</td>
    <td>{props.name} {props.volumn}</td>
    <td>{props.stock}</td>
    <td>
      <Link to={`/backoffice/products/edit`}>Update</Link>
    </td>
  </tr>
)
