import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Async from 'react-code-splitting'
import { connect } from 'react-redux'


import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import GlobalError from 'components/GlobalError/GlobalError'
import Home from 'pages/home/home'
import CategoryIndex from 'pages/category/index'
import CategoryShow from 'pages/category/show'
import ProductShow from 'pages/product/show'
import Search from 'pages/search/search'
import Signin from 'pages/signin/signin'
import CartShow from 'pages/cart/show'


let UserShow = null
let CheckoutDirections = null
let CheckoutConfirmation = null
let CheckoutSuccessful = null
let OrderShow = null
let BackofficeShow = null
require.ensure([], function (require) {
  UserShow = require('pages/user/show').default
  CheckoutDirections = require('pages/checkout/directions').default
  CheckoutConfirmation = require('pages/checkout/confirmation').default
  CheckoutSuccessful = require('pages/checkout/successful').default
  OrderShow = require('pages/order/show').default
  BackofficeShow = require('pages/backoffice/show').default
})

let QuienSomos = null
let History = null
let NuestraPro = null
let PorqueOrganico = null
let Terms = null
let Awards = null
let PasswordReset = null
let Stores = null
require.ensure([], function (require) {
  QuienSomos = require('pages/others/quien_somos').default
  History = require('pages/others/history').default
  NuestraPro = require('pages/others/nuestra_pro').default
  PorqueOrganico = require('pages/others/porque_organico').default
  Terms = require('pages/others/terms').default
  Awards = require('pages/others/awards').default
  PasswordReset = require('pages/others/reset').default
  Stores = require('pages/store/stores').default
})


@connect( store => {
  return {
    user: store.user,
  }
})
export default class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }


  render() {
    const {
      user
    } = this.props

    return (
      <div id='layout'>
        <GlobalError/>
        <Header history={this.props.history}/>

        <Route exact path="/" component={Home}/>
        <Route path="/home" component={Home}/>
        <Route exact path="/categories/:index" component={CategoryIndex}/>
        <Route exact path="/categories/:index/:sub" component={CategoryIndex}/>
        <Route exact path="/categories/:index/:sub/:show" component={CategoryShow}/>

        <Route path="/product/:id" component={ProductShow}/>
        <Route path="/search" component={Search}/>
        <Route path="/cart" component={CartShow}/>
        <Route path="/signin" component={Signin}/>
        {/*<Route path="/contact" component={Contact}/>*/}
        <Route path="/passwordreset" component={PasswordReset}/>
        <Route path="/stores" component={Stores}/>

        {user.get('token') &&
          <div>
            <Switch>
              <Route exact path="/user/:id/order/:order_id" render={props => <OrderShow user={user} {...props}/>}/>
              <Route path="/user/:id" render={props => <UserShow user={user} {...props}/>}/>
            </Switch>

            <Route path="/checkout" render={props => <CheckoutDirections user={user} {...props}/>}/>
            <Route path="/confirmation" render={props => <CheckoutConfirmation user={user} {...props}/>}/>
            <Route path="/successful" render={props => <CheckoutSuccessful user={user} {...props}/>}/>
          </div>
        }

        {user.get('token') && user.get('admin') &&
          <Route path="/backoffice" component={BackofficeShow}/>
        }

        <Route path="/quienSomos" component={QuienSomos}/>
        <Route path="/history" component={History}/>
        <Route path="/nuestraPromesa" component={NuestraPro}/>
        <Route path="/porqueOrganico" component={PorqueOrganico}/>
        <Route path="/terminosCondiciones" component={Terms}/>
        <Route path="/awards" component={Awards}/>


        <Footer/>
      </div>
    )
  }
}
