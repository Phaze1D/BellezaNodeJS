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
    const {
      match
    } = this.props

    return (
      <main>
        <ul className="backoffice-nav">
          <li>
            <Link to={`${match.url}/orders?status=pagado&page=0`}>Orders</Link>
          </li>

          <li>
            <Link to={`${match.url}/products`}>Products</Link>
          </li>

          <li>
            <Link to={`${match.url}/users`}>Clients</Link>
          </li>

          <li>
            <Link to={`${match.url}/banners`}>Banners</Link>
          </li>

          <li>
            <Link to={`${match.url}/mails`}>Mailing List</Link>
          </li>
        </ul>

        <Redirect from={`${match.url}/`} to={`${match.url}/orders?status=pagado&page=0`}/>
        <Route path={`${match.url}/orders`} component={BackofficeOrders}/>
        <Route path={`${match.url}/products`} component={ProductsIndex}/>
        <Route path={`${match.url}/product/new`} component={ProductsNew}/>
        <Route path={`${match.url}/product/edit`} component={ProductsEdit}/>
        <Route path={`${match.url}/users`} component={UsersIndex}/>
        <Route path={`${match.url}/codes/new`} component={CodesNew}/>
        <Route path={`${match.url}/banners`} component={BannersIndex}/>
        <Route path={`${match.url}/banners/new`} component={BannersNew}/>
        <Route path={`${match.url}/banners/edit`} component={BannersEdit}/>
        <Route path={`${match.url}/mails`} component={BackofficeMails}/>
      </main>
    )
  }
}
