import React from 'react'
import { Route } from 'react-router-dom'
import Header from 'js/components/Header'
import Footer from 'js/components/Footer'
import Home from 'js/pages/home'



export default class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='layout'>
        <Header/>
        <Route path="/" component={Home}/>
        <Footer/>
      </div>
    )
  }
}
