import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import Home from 'pages/home/home'
import Categories from 'pages/categories/categories'
import Category from 'pages/category/category'
import Product from 'pages/product/product'
import Search from 'pages/search/search'



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
        <Route path="/categories" component={Categories}/>
        <Route path="/category" component={Category}/>
        <Route path="/product" component={Product}/>
        <Route path="/search" component={Search}/>
        <Footer/>
      </div>
    )
  }
}
