import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Header from 'js/components/Header'
import Footer from 'js/components/Footer'
import Home from 'js/pages/home'
import Categories from 'js/pages/categories'



export default class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='layout'>
        <Header/>
        <Redirect from='/' to='/home'/>
        <Route path="/home" component={Home}/>
        <Route path="/categories" component={Categories}/>
        <Footer/>
      </div>
    )
  }
}
