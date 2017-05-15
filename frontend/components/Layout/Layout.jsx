import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import Home from 'pages/home/home'
import CategoryIndex from 'pages/category/index'
import CategoryShow from 'pages/category/show'
import ProductShow from 'pages/product/show'
import Search from 'pages/search/search'
import Signin from 'pages/signin/signin'
import UserShow from 'pages/user/show'
import CartShow from 'pages/cart/show'
import CheckoutDirections from 'pages/checkout/directions'
import CheckoutConfirmation from 'pages/checkout/confirmation'
import CheckoutSuccessful from 'pages/checkout/successful'
import OrderShow from 'pages/order/show'

/******* REMOVE THIS SECTION IN PRODUCTION *******/
// import QuienSomos from 'pages/others/quien_somos'
// import History from 'pages/others/history'
// import NuestraPro from 'pages/others/nuestra_pro'
// import PorqueOrganico from 'pages/others/porque_organico'
// import Terms from 'pages/others/terms'
// import Awards from 'pages/others/awards'
/******* REMOVE THIS SECTION IN PRODUCTION *******/

import Contact from 'pages/others/contact'
import PasswordReset from 'pages/others/reset'
import Stores from 'pages/store/stores'
import BackofficeShow from 'pages/backoffice/show'



export default class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  /******* REMEMBER ALL POST COULD HAVE ERRORS *******/

  render() {
    return (
      <div id='layout'>
        <Header/>
        <Redirect from='/' to='/home'/>
        <Route path="/home" component={Home}/>
        <Route path="/categories" component={CategoryIndex}/>
        <Route path="/category" component={CategoryShow}/>
        <Route path="/product" component={ProductShow}/>
        <Route path="/search" component={Search}/>
        <Route path="/cart" component={CartShow}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/reset" component={PasswordReset}/>
        <Route path="/stores" component={Stores}/>

        {/* Missing Redirect if user is not logged in */}
        <Route path="/user" component={UserShow}/>
        <Route path="/checkout" component={CheckoutDirections}/>
        <Route path="/confirmation" component={CheckoutConfirmation}/>
        <Route path="/successful" component={CheckoutSuccessful}/>

        {/* Missing Redirect if user is not logged in and user is not admin*/}
        <Route path="/backoffice" component={BackofficeShow}/>
        <Route path="/order" component={OrderShow}/>

        {/******* REMOVE THIS SECTION IN PRODUCTION *******
        <Route path="/quienSomos" component={QuienSomos}/>
        <Route path="/history" component={History}/>
        <Route path="/nuestraPromesa" component={NuestraPro}/>
        <Route path="/porqueOrganico" component={PorqueOrganico}/>
        <Route path="/terminosCondiciones" component={Terms}/>
        <Route path="/awards" component={Awards}/>
        ******* REMOVE THIS SECTION IN PRODUCTION *******/}

        <Footer/>
      </div>
    )
  }
}
