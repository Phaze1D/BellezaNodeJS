import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import GlobalError from 'components/GlobalError/GlobalError'
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


  render() {
    return (
      <div id='layout'>
        <GlobalError/>
        <Header history={this.props.history}/>

        <Redirect from='/' to='/home'/>
        <Route path="/home" component={Home}/>
        <Route exact path="/categories/:index" component={CategoryIndex}/>
        <Route exact path="/categories/:index/:sub" component={CategoryIndex}/>

        <Route path="/category/:index/:sub/:show" component={CategoryShow}/>
        <Route path="/product/:id" component={ProductShow}/>
        <Route path="/search" component={Search}/>
        <Route path="/cart" component={CartShow}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/passwordreset" component={PasswordReset}/>
        <Route path="/stores" component={Stores}/>

        <Switch>
          <Route exact path="/user/:id/order/:order_id" component={OrderShow}/>
          <Route path="/user/:id" component={UserShow}/>
        </Switch>

        <Route path="/checkout" component={CheckoutDirections}/>
        <Route path="/confirmation" component={CheckoutConfirmation}/>
        <Route path="/successful" component={CheckoutSuccessful}/>

        <Route path="/backoffice" component={BackofficeShow}/>


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
