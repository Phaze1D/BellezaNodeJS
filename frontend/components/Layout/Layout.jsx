import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
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
import PasswordReset from 'pages/password/reset'

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
let PasswordForgot = null
let Stores = null
require.ensure([], function (require) {
  QuienSomos = require('pages/others/quien_somos').default
  History = require('pages/others/history').default
  NuestraPro = require('pages/others/nuestra_pro').default
  PorqueOrganico = require('pages/others/porque_organico').default
  Terms = require('pages/others/terms').default
  Awards = require('pages/others/awards').default
  PasswordForgot = require('pages/password/forgot').default
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

        <Switch>
          <Route exact path="/user/:id/order/:order_id" render={props => signinRedirect(user, props, OrderShow)}/>
          <Route path="/user/:id" render={props => signinRedirect(user, props, UserShow)}/>
        </Switch>

        <Route path="/checkout" render={props => signinRedirect(user, props, CheckoutDirections)}/>
        <Route path="/confirmation" render={props => signinRedirect(user, props, CheckoutConfirmation)}/>
        <Route path="/successful" render={props => signinRedirect(user, props, CheckoutSuccessful)}/>

        {user.get('token') && user.get('admin') &&
          <Route path="/backoffice" render={props => signinRedirect(user, props, BackofficeShow)}/>
        }

        <Route path="/quiensomos" component={QuienSomos}/>
        <Route path="/history" component={History}/>
        <Route path="/nuestrapromesa" component={NuestraPro}/>
        <Route path="/porqueorganico" component={PorqueOrganico}/>
        <Route path="/terminoscondiciones" component={Terms}/>
        <Route path="/awards" component={Awards}/>
        {/*<Route path="/contact" component={Contact}/>*/}
        <Route path="/password/forgot" component={PasswordForgot}/>
        <Route path="/stores" component={Stores}/>
        <Route path="/password/reset/:token" render={props => <PasswordReset {...props} user={user}/>}/>

        <Footer/>
      </div>
    )
  }
}


const signinRedirect = (user, props, Component) => (
  user.get('token') ? <Component user={user} {...props}/> : <Redirect to={`/signin?redirect=${props.match.url}`}/>
)
