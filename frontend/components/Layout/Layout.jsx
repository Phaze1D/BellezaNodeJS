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
      <div className='layout'>
        <Header/>
        <Redirect from='/' to='/home'/>
        <Route path="/home" component={Home}/>
        <Route path="/categories" component={CategoryIndex}/>
        <Route path="/category" component={CategoryShow}/>
        <Route path="/product" component={ProductShow}/>
        <Route path="/search" component={Search}/>
        <Route path="/signin" component={Signin}/>
        <Footer/>
      </div>
    )
  }
}
