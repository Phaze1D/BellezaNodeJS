import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Header from 'js/components/Header'
import Footer from 'js/components/Footer'
import Home from 'js/pages/home'
import Categories from 'js/pages/categories'
import Category from 'js/pages/category'
import Product from 'js/pages/product'
import Search from 'js/pages/search'



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
