import React from 'react'
import { connect } from 'react-redux'

@connect(store => {
  return {
    fetching: store.fetching
  }
})
export default class Loader extends React.Component {
  constructor(props) {
    super(props)
  }


  render(){
    const {
      fetching,
      children
    } = this.props

    if(fetching){
      return(
        <div className="sk-circle">
          <div className="sk-circle1 sk-child"></div>
          <div className="sk-circle2 sk-child"></div>
          <div className="sk-circle3 sk-child"></div>
          <div className="sk-circle4 sk-child"></div>
          <div className="sk-circle5 sk-child"></div>
          <div className="sk-circle6 sk-child"></div>
          <div className="sk-circle7 sk-child"></div>
          <div className="sk-circle8 sk-child"></div>
          <div className="sk-circle9 sk-child"></div>
          <div className="sk-circle10 sk-child"></div>
          <div className="sk-circle11 sk-child"></div>
          <div className="sk-circle12 sk-child"></div>
        </div>
      )
    }else{
      return children ? children : null
    }
  }
}
