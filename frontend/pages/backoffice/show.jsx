import React, { PropTypes } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import BackofficeOrders from 'pages/backoffice/orders'
import BackofficeMails from 'pages/backoffice/mails'
import ProductsIndex from 'pages/product/index'
import ProductsNew from 'pages/product/new'
import ProductsEdit from 'pages/product/edit'
import UsersIndex from 'pages/user/index'
import CodesNew from 'pages/code/new'
import BannersIndex from 'pages/banner/index'
import BannersNew from 'pages/banner/new'
import BannersEdit from 'pages/banner/edit'



export default class BackofficeShow extends React.Component {
  render() {


    return (
      <main>
        <ul className="backoffice-nav">
          <li>
            <Link to={`${this.props.match.url}/orders`}>Orders</Link>
          </li>

          <li>
            <Link to={`${this.props.match.url}/products/index`}>Products</Link>
          </li>

          <li>
            <Link to={`${this.props.match.url}/users/index`}>Clients</Link>
          </li>

          <li>
            <Link to={`${this.props.match.url}/banners/index`}>Banners</Link>
          </li>

          <li>
            <Link to={`${this.props.match.url}/mails`}>Mailing List</Link>
          </li>
        </ul>

        <Redirect from={`${this.props.match.url}/`} to={`${this.props.match.url}/orders`}/>
        <Route path={`${this.props.match.url}/orders`} component={BackofficeOrders}/>
        <Route path={`${this.props.match.url}/products/index`} component={ProductsIndex}/>
        <Route path={`${this.props.match.url}/products/new`} component={ProductsNew}/>
        <Route path={`${this.props.match.url}/products/edit`} component={ProductsEdit}/>
        <Route path={`${this.props.match.url}/users/index`} component={UsersIndex}/>
        <Route path={`${this.props.match.url}/codes/new`} component={CodesNew}/>
        <Route path={`${this.props.match.url}/banners/index`} component={BannersIndex}/>
        <Route path={`${this.props.match.url}/banners/new`} component={BannersNew}/>
        <Route path={`${this.props.match.url}/banners/edit`} component={BannersEdit}/>
        <Route path={`${this.props.match.url}/mails`} component={BackofficeMails}/>
      </main>
    )
  }
}
